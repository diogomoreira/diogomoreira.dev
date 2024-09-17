import PageTitle from "@/components/PageTitle";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";
import { getPageBySlug } from "../lib/content/pages";
import { parseMarkdown } from "../lib/markdown.api";

import { appConfig, articleJsonLd } from "../config";
import logo from "public/images/logo.png";
import { Page } from "../models/page.model";
import { ContentPath } from "../lib/content/paths";
import { formatRFC3339 } from "date-fns";

type UsesPageStaticProps = { page: Page; content: string };

export const getStaticProps: GetStaticProps<UsesPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  const page = getPageBySlug("uses");
  const content = await parseMarkdown(page.content);
  return {
    props: {
      page,
      content,
      ...(await serverSideTranslations(currentLocale, ["common", "uses"])),
    },
  };
};

type UsesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function UsesPage({ page, content }: Readonly<UsesPageProps>) {
  const { siteUrl } = appConfig;
  const usesPageUrl = `${siteUrl}/uses`;
  const usesPagePublishDate = formatRFC3339(page.published);
  const usesPageModifiedDate = formatRFC3339(page.updated);
  const articleCover = `${ContentPath.IMAGES}/pages/uses/${page.cover}`;
  return (
    <>
      <NextSeo title={page.title} description={page.description} />
      <ArticleJsonLd
        url={usesPageUrl}
        title={page.title}
        description={page.description}
        datePublished={usesPagePublishDate}
        dateModified={usesPageModifiedDate}
        images={[`${siteUrl}/${page.cover || logo.src}`]}
        {...articleJsonLd}
      />
      <article className="mt-8 prose max-w-none mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-strong:font-semibold">
        <PageTitle>{page.title}</PageTitle>
        {page.cover && (
          <figure className="relative w-full border-4 rounded-lg shadow-lg border-spring-wood-200/[.5] dark:border-neutral-800/[.5] overflow-hidden">
            <Image className="object-cover" width={1920} height={1080} src={articleCover} alt={page.title} />
          </figure>
        )}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  );
}
