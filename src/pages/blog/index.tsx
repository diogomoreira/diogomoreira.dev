import PostsList from "@/components/PostsList";
import { PostItem } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
    revalidate: 3,
  };
};

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  useEffect(() => {
    fetch("/api/posts")
      .then(response => response.json())
      .then(({ posts }) => setPosts(posts));
  }, []);
  const { t } = useTranslation("blog");
  return (
    <>
      <h1 className="page-title">🪴 {t("title")}</h1>
      <p className="page-description">
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      <PostsList posts={posts} />
    </>
  );
};

export default BlogPage;
