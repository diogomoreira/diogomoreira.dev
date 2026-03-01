import PageTitle from "@/components/PageTitle";
import PostList from "@/components/PostList";
import { appConfig } from "@/config/app.config";
import { Content, getContentFromDirectory } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type BlogPageStaticProps = { posts: Content[] };

export const getStaticProps: GetStaticProps<BlogPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const posts: Content[] = getContentFromDirectory("posts");
  return {
    props: {
      posts,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
    revalidate: 3,
  };
};

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = ({ posts: articles }: BlogPageProps) => {
  const { author } = appConfig;
  const { t } = useTranslation("blog");
  return (
    <>
      <PageTitle>{t("title")}</PageTitle>
      <p>
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      <PostList posts={articles} />
    </>
  );
};

export default BlogPage;
