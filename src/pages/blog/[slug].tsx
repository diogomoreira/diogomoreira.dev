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
import { Tag, Tags } from "@/components/Tag";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageProse from "@/components/PageProse";

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
  const { siteUrl } = useAppConfig();
  const { t } = useTranslation();

  const postUrl = `${siteUrl}/blog/${post.url}`;

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
      <h1 className="text-center md:text-left text-4xl md:text-6xl mb-4 font-bold">{post.title}</h1>
      <p className="text-center md:text-left text-slate-500 mb-4 dark:text-slate-300">{post.description}</p>
      <div className="flex gap-2 flex-col md:flex-row items-center">
        <div className="flex gap-2 text-xs">
          <span>📅</span>
          <time className="text-slate-600 dark:text-slate-400">
            {t("{{val, datetime}}", {
              val: new Date(post.publishedAt),
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </time>
        </div>
        <div>
          <Tags>
            {post.tags.map(tag => (
              <Tag key={uuid()}>{tag}</Tag>
            ))}
          </Tags>
        </div>
      </div>
      <PageProse>
        <article>
          {post.coverImage && (
            <figure className="relative shadow-md my-6">
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
          <aside className="mt-8">
            <Comments />
          </aside>
        </article>
      </PageProse>
    </>
  );
};

export default BlogPostPage;
