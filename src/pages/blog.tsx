import PostsList from "@/components/PostsList";
import { PostItem, getAllPosts } from "@/lib/content";
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
  };
};

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  useEffect(() => {
    getAllPosts().then(posts => setPosts(posts));
  }, []);
  const { t } = useTranslation("blog");
  return (
    <>
      <h1 className="text-4xl mb-6 font-bold">🪴 {t("title")}</h1>
      <p className="leading-loose mb-6">
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      <div>
        <PostsList posts={posts} />
      </div>
    </>
  );
};

export default BlogPage;
