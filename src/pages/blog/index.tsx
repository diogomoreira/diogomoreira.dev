import LoadingState from "@/components/Layout/LoadingState";
import PageTitle from "@/components/PageTitle";
import PostsList from "@/components/PostsList";
import { PostItem } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

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
  const [loadingPosts, setLoadingPosts] = useState(true);
  useEffect(() => {
    fetch("/api/posts")
      .then(response => response.json())
      .then(({ posts }) => {
        setPosts(posts);
        setLoadingPosts(false);
      });
  }, []);
  const { t } = useTranslation("blog");
  return (
    <>
      <PageTitle>{t("title")}</PageTitle>
      <p className="mx-auto md:px-0 mt-2 leading-loose mb-6">
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      {loadingPosts ? <LoadingState /> : <PostsList posts={posts} />}
    </>
  );
};

export default BlogPage;
