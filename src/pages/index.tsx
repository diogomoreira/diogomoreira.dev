import React from "react";

import Author from "@/components/Author";
import PostsList from "@/components/PostsList";
import { appConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Post } from "@/models/post.model";
import { getAllPosts } from "@/lib/content/posts";
import PageSection from "@/components/PageSection";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const posts: Post[] = getAllPosts();
  return {
    props: {
      posts,
      ...(await serverSideTranslations(currentLocale, ["index", "common"])),
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ posts }: Readonly<IndexPageProps>) => {
  const { description } = appConfig;
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <NextSeo title="Home Page" description={description} />
      <Author />
      <PageSection>
        <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
      </PageSection>
      <PostsList posts={posts} />
      <Link href={"/blog"} className="text-sm">
        <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
      </Link>
    </>
  );
};

export default IndexPage;
