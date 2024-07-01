import React from "react";

import Author from "@/components/Author";
import LoadingState from "@/components/Layout/LoadingState";
import PostsList from "@/components/PostsList";
import { useAppConfig } from "@/config";
import { PostItem } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [loadingPosts, setLoadingPosts] = useState(true);
  useEffect(() => {
    fetch("/api/posts")
      .then(response => response.json())
      .then(({ posts }) => {
        setPosts(posts);
        setLoadingPosts(false);
      });
  }, []);
  const { description } = useAppConfig();
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <NextSeo title="Home Page" description={description} />
      <Author />
      <div className="pb-2 my-6 flex items-center justify-between border-b border-spring-wood-200 dark:border-gray-600">
        <h2 className="text-xl tracking-tight font-semibold">
          <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
        </h2>
        <Link href={"/blog"} className="text-sm">
          <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
        </Link>
      </div>
      {loadingPosts ? <LoadingState /> : <PostsList posts={posts} />}
    </>
  );
};

export default IndexPage;
