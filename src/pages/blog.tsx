import { Content } from "@/components/Layout/Content";
import PostsList from "@/components/PostsList";
import { PostItem, getAllPosts } from "@/lib/content";
import styles from "@/styles/pages/notes.module.scss";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps<{ posts: PostItem[] }> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const posts: PostItem[] = await getAllPosts();
  return {
    props: {
      posts,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
  };
};

const BlogPage: NextPage<BlogPageProps> = ({ posts }: BlogPageProps) => {
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
