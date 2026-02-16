import PageTitle from "@/components/PageTitle";
import { ArticlesList } from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/config";
import { getAllArticles } from "@/lib/content/articles";
import { Article } from "@/models/article.model";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaDev } from "react-icons/fa6";

type BlogPageStaticProps = { articles: Article[] };

export const getStaticProps: GetStaticProps<BlogPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const articles: Article[] = getAllArticles();
  return {
    props: {
      articles: articles,
      ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
    },
    revalidate: 3,
  };
};

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage: NextPage<BlogPageProps> = ({ articles }: BlogPageProps) => {
  const { author } = appConfig;
  const { t } = useTranslation("blog");
  return (
    <>
      <PageTitle>{t("title")}</PageTitle>
      <p>
        <Translation t={t} i18nKey="intro"></Translation>
      </p>
      <p>
        <Button variant="default" asChild>
          <a href={author.devto} target="_blank" rel="noreferrer">
            <FaDev className="mr-2 h-4 w-4" />
            <span>Dev.to</span>
          </a>
        </Button>
      </p>
      <ArticlesList articles={articles} />
    </>
  );
};

export default BlogPage;
