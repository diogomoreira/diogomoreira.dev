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
import PageTitle from "@/components/PageTitle";
import PageDescription from "@/components/PageDescription";
import PageProse from "@/components/PageProse";
import PageFigure from "@/components/PageFigure";

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
      <PageTitle>
        {page.icon} {page.title}
      </PageTitle>
      <PageDescription>{page.description}</PageDescription>
      {page.coverImage && (
        <PageFigure>
          <Image
            className="object-cover"
            fill
            src={`${ContentPath.PAGES_COVER_IMAGES}/${page.slug}/${page.coverImage}`}
            alt={page.title}
          />
        </PageFigure>
      )}
      <article>
        <PageProse>
          <MDXRemote {...content} />
        </PageProse>
      </article>
    </>
  );
};

export default Page;
