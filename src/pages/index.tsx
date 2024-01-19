import React, { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import PostsList from "@/components/PostsList";
import { useAppConfig } from "@/config";
import { PostItem } from "@/lib/content";
import Author from "@/components/Author";
import { LinkButton } from "@/components/Button";
import LoadingState from "@/components/Layout/LoadingState";

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
      <h2 className="page-section">
        <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
        <LinkButton href={"/blog"}>
          <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
        </LinkButton>
      </h2>
      {loadingPosts ? <LoadingState /> : <PostsList posts={posts} />}
    </>
  );
};

export default IndexPage;
