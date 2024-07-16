import React from "react";

import Comments from "@/components/Comments";
import { HashTag, Tags } from "@/components/Tag";
import { articleJsonLd, appConfig } from "@/config";
import { ContentPath, getPostByPath, getPostsSlugs } from "@/lib/content";
import { mdxToHtml } from "@/lib/content/markdown.api";
import { differenceInDays } from "date-fns";
import { InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import logo from "public/images/logo.png";
import { v4 as uuid } from "uuid";
import PostTitle from "@/components/PostTitle";

type PostPageStaticProps = {
  locale: string | null;
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params, locale }: PostPageStaticProps) {
  const { slug } = params;
  const post = getPostByPath(slug);
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
  const slugs = getPostsSlugs();
  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

type BlogPostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, content }: BlogPostPageProps) => {
  const { author, title, siteUrl } = appConfig;
  const { t } = useTranslation();
  const postUrl = `${siteUrl}/blog/${post.url}`;
  const postDate = new Date(post.date);
  return (
    <>
      <NextSeo title={post.title} description={post.description} />
      <ArticleJsonLd
        url={postUrl}
        title={post.title}
        description={post.description}
        datePublished={post.date}
        images={[`${siteUrl}/${post.cover || logo.src}`]}
        {...articleJsonLd}
      />
      <PostTitle>{post.title}</PostTitle>
      <p className="text-center text-spring-wood-500 mb-4 dark:text-gray-300">{post.description}</p>
      <div className="flex flex-col md:flex-row gap-2 justify-center mb-4 items-center text-sm text-spring-wood-700 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <Image className="rounded-full w-10" src={author.image} width={175} height={175} alt={title} />
          <span>{author.name}</span>
        </div>
        <time className="flex gap-2">
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
      <article className="mt-8 prose max-w-none mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-strong:font-semibold">
        {post.cover && (
          <figure className="relative w-full shadow-lg">
            <Image
              className="object-cover"
              width={1920}
              height={1080}
              src={`${ContentPath.POSTS_COVER_IMAGES}/${post.cover}`}
              alt={post.title}
            />
          </figure>
        )}
        <MDXRemote {...content} />
        <aside className="mt-8">
          <Comments />
        </aside>
      </article>
    </>
  );
};

export default BlogPostPage;
