import { Content } from "@/components/Layout/Content";
import PostsList from "@/components/PostsList";
import { PostItem, getAllPosts } from "@/lib/content";
import styles from "@/styles/pages/notes.module.scss";
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
    <Content>
      <h1>🪴 {t("title")}</h1>
      <p>
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      <div className={styles.contentContainer}>
        <PostsList posts={posts} />
      </div>
    </Content>
  );
};

export default BlogPage;
