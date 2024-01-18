import { articleJsonLd, useAppConfig } from "@/config";
import { NextPage } from "next";
import React from "react";
import { InferGetStaticPropsType } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Comments from "@/components/Comments";
import logo from "public/images/logo.png";
import { ContentPath, getPostByPath, getPostsSlugs } from "@/lib/content";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { useTranslation } from "next-i18next";
import { MDXRemote } from "next-mdx-remote";
import { mdxToHtml } from "@/lib/content/markdown.api";
import { HashTag, Tag, Tags } from "@/components/Tag";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { differenceInDays } from "date-fns";

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  const post = await getPostByPath(slug);
  const content = await mdxToHtml(post);
  const currentLocale = locale || "en";
  return {
    props: {
      post,
      content,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
  };
}

export async function getStaticPaths() {
  const notes = await getPostsSlugs();
  return {
    paths: notes.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

type BlogPostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, content }: BlogPostPageProps) => {
  const { author, title, siteUrl } = useAppConfig();
  const { t } = useTranslation();
  const postUrl = `${siteUrl}/blog/${post.url}`;
  const postDate = new Date(post.publishedAt);
  return (
    <>
      <NextSeo title={post.title} description={post.description} />
      <ArticleJsonLd
        url={postUrl}
        title={post.title}
        description={post.description}
        datePublished={post.publishedAt}
        images={[`${siteUrl}/${post.coverImage || logo.src}`]}
        {...articleJsonLd}
      />
      <h1 className="post-page-title">{post.title}</h1>
      <p className="post-page-description">{post.description}</p>
      <div className="post-page-meta">
        <div className="post-page-author-container">
          <Image className="post-page-author-image" src={author.image} width={175} height={175} alt={title} />
          <span>{author.name}</span>
        </div>
        <time className="post-page-meta-timestamp">
          <span>
            {t("{{val, datetime}}", {
              val: postDate,
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </span>
          <span>
            (
            {t("{{val, relativetime}}", {
              val: differenceInDays(postDate, new Date()),
            })}
            )
          </span>
        </time>
        <Tags>
          {post.tags.map(tag => (
            <HashTag key={uuid()}>{tag}</HashTag>
          ))}
        </Tags>
      </div>
      <article className="post-page-article">
        {post.coverImage && (
          <figure className="page-page-figure">
            <Image
              className="object-cover"
              width={1920}
              height={1080}
              src={`${ContentPath.POSTS_COVER_IMAGES}/${post.coverImage}`}
              alt={post.title}
            />
          </figure>
        )}
        <MDXRemote {...content} />
        <aside className="post-comments">
          <Comments />
        </aside>
      </article>
    </>
  );
};

export default BlogPostPage;
