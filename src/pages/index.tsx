import React from "react";

import Author from "@/components/Author";
import { appConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Post } from "@/models/post.model";
import { getAllArticles } from "@/lib/content/articles";
import PageSection from "@/components/PageSection";
import { ArticlesList } from "@/components/Posts";
import Image from "next/image";

type IndexPageStaticProps = { posts: Post[] };

export const getStaticProps: GetStaticProps<IndexPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const posts: Post[] = getAllArticles();
  return {
    props: {
      posts,
      ...(await serverSideTranslations(currentLocale, ["index", "common"])),
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ posts }: Readonly<IndexPageProps>) => {
  const { author, title, description } = appConfig;
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <NextSeo title="Home Page" description={description} />
      <div className="flex flex-col gap-6 items-center">
        <Image
          className="rounded-lg border-4 border-spring-wood-200/[.5] dark:border-neutral-800/[.5] shadow-lg brightness-100 contrast-100"
          src={author.image}
          width={175}
          height={175}
          alt={title}
        />
        <div className="flex-1 flex flex-col gap-6 text-center">
          <h1 className="text-4xl">
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2 className="font-light">
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
        </div>
      </div>
      <p>
        <Translation
          t={t}
          i18nKey="presentation"
          components={{
            bold: <strong key={"bold"} />,
            blog: <Link href={"/blog"} />,
          }}
        ></Translation>
      </p>
      <PageSection>
        <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
      </PageSection>
      <ArticlesList articles={posts} />
      <Link href={"/blog"} className="text-sm">
        <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
      </Link>
    </>
  );
};

export default IndexPage;
