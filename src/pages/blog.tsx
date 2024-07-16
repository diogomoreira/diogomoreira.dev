import React from "react";
import PageTitle from "@/components/PageTitle";
import PostsList from "@/components/PostsList";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Post } from "@/models/post.model";
import { getAllPosts } from "@/lib/content/posts";
import PageSection from "@/components/PageSection";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const posts: Post[] = getAllPosts();
  return {
    props: {
      posts,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
    revalidate: 3,
  };
};

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = ({ posts }: BlogPageProps) => {
  const { t } = useTranslation("blog");
  return (
    <>
      <PageTitle>{t("title")}</PageTitle>
      <p className="mx-auto md:px-0 mt-2 leading-loose mb-6">
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      <PostsList posts={posts} />
      <PageSection>Latest from dev.to</PageSection>
    </>
  );
};

export default BlogPage;
