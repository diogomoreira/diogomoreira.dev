import { articleJsonLd, useAppConfig } from "@/config";
import { NextPage } from "next";
import React from "react";
import { InferGetStaticPropsType } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";
import logo from "public/images/logo.png";
import { ContentPath } from "@/lib/content";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { mdxToHtml } from "@/lib/content/markdown.api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPageByPath, getPagesSlugs } from "@/lib/content/pages.api";

type PageStaticProps = {
  locale: string | null;
  params: {
    page: string;
  };
};

export async function getStaticProps({ params, locale }: PageStaticProps) {
  const { page } = params;
  const pageDetails = await getPageByPath(page);
  const content = await mdxToHtml(pageDetails);
  const currentLocale = locale || "en";
  return {
    props: {
      page: pageDetails,
      content,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
  };
}

export async function getStaticPaths() {
  const pages = await getPagesSlugs();
  return {
    paths: pages.map(page => ({ params: { page } })),
    fallback: false,
  };
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ page, content }: PageProps) => {
  const { siteUrl } = useAppConfig();
  const postUrl = `${siteUrl}/${page.slug}`;

  return (
    <>
      <NextSeo title={page.title} description={page.description} />
      <ArticleJsonLd
        url={postUrl}
        title={page.title}
        description={page.description}
        datePublished={page.publishedAt}
        images={[`${siteUrl}/${page.coverImage || logo.src}`]}
        {...articleJsonLd}
      />
      <h1 className="page-title">
        {page.icon} {page.title}
      </h1>
      <p className="page-description">{page.description}</p>
      {page.coverImage && (
        <figure className="page-figure">
          <Image
            className="object-cover rounded-md"
            fill
            src={`${ContentPath.PAGES_COVER_IMAGES}/${page.slug}/${page.coverImage}`}
            alt={page.title}
          />
        </figure>
      )}
      <article className="page-article">
        <MDXRemote {...content} />
      </article>
    </>
  );
};

export default Page;
