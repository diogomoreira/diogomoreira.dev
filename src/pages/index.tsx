import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import PostsList from "@/components/PostsList";
import { useAppConfig } from "@/config";
import { PostItem, getAllPosts } from "@/lib/content";
import Author from "@/components/Author";
import { LinkButton } from "@/components/Button";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["index", "common"])),
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  useEffect(() => {
    getAllPosts().then(posts => setPosts(posts));
  }, []);
  const { description } = useAppConfig();
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <NextSeo title="Home Page" description={description} />
      <div className="flex flex-col gap-6">
        <Author />
        <h2 className="text-2xl tracking-tight font-bold flex justify-between border-b border-slate-200 dark:border-slate-600 mb-4">
          <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
          <LinkButton href={"/blog"}>
            <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
          </LinkButton>
        </h2>
        <PostsList posts={posts} />
      </div>
    </>
  );
};

export default IndexPage;
