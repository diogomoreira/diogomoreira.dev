import React from "react";

import Comments from "@/components/Comments";
import { HashTag, Tags } from "@/components/Tag";
import { articleJsonLd, appConfig } from "@/config";
import { differenceInDays } from "date-fns";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import logo from "public/images/logo.png";
import { v4 as uuid } from "uuid";
import { getArticleByPath, getSlugs } from "@/lib/content/articles";
import { Article } from "@/models/article.model";
import { ContentPath } from "@/lib/content/paths";
import { parseMarkdown } from "@/lib/markdown.api";

type ArticlePageGetStaticPropsParams = GetStaticPropsContext & {
  locale: string | undefined;
  params: {
    slug: string;
  };
};

type ArticleStaticProps = {
  article: Article;
  content: string;
};

export const getStaticProps: GetStaticProps<ArticleStaticProps> = async (context: GetStaticPropsContext) => {
  const {
    locale,
    params: { slug },
  } = context as unknown as ArticlePageGetStaticPropsParams;
  const article = getArticleByPath(slug);
  const content = await parseMarkdown(article.content);
  const currentLocale = locale ?? "en";
  return {
    props: {
      article,
      content,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
  };
};

export async function getStaticPaths() {
  const slugs = getSlugs();
  return {
    paths: slugs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

type ArticlePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ArticlePage: NextPage<ArticlePageProps> = ({ article, content }: ArticlePageProps) => {
  const { siteUrl } = appConfig;
  const { t } = useTranslation();
  const articleUrl = `${siteUrl}/blog/${article.path}`;
  const articleDate = new Date(article.date);
  const articleCover = `${ContentPath.IMAGES}/articles/cover/${article.cover}`;
  return (
    <>
      <NextSeo title={article.title} description={article.description} />
      <ArticleJsonLd
        url={articleUrl}
        title={article.title}
        description={article.description}
        datePublished={article.date}
        images={[`${siteUrl}/${article.cover || logo.src}`]}
        {...articleJsonLd}
      />
      <h1 className="text-6xl text-center mb-6 font-bold">{article.title}</h1>
      <p className="text-center italic text-spring-wood-500 mb-4 dark:text-gray-300">{article.description}</p>
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-4 items-center text-sm text-spring-wood-700 dark:text-gray-200">
        <time className="flex gap-6">
          <span>
            {t("{{val, datetime}}", {
              val: articleDate,
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </span>
          <span>
            (
            {t("{{val, relativetime}}", {
              val: differenceInDays(articleDate, new Date()),
            })}
            )
          </span>
        </time>
        <Tags>
          {article.tags.map(tag => (
            <HashTag key={uuid()}>{tag}</HashTag>
          ))}
        </Tags>
      </div>
      <article className="mt-8 prose max-w-none mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-strong:font-semibold">
        {article.cover && (
          <figure className="relative w-full border-4 rounded-lg shadow-lg border-spring-wood-200/[.5] dark:border-neutral-800/[.5] overflow-hidden">
            <Image className="object-cover" width={1920} height={1080} src={articleCover} alt={article.title} />
          </figure>
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <aside className="mt-8">
          <Comments />
        </aside>
      </article>
    </>
  );
};

export default ArticlePage;
