import PageSection from "@/components/PageSection";
import { ArticlesList } from "@/components/Posts";
import { appConfig } from "@/config";
import { getAllArticles } from "@/lib/content/articles";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { Article } from "../models/article.model";

type IndexPageStaticProps = { posts: Article[] };

export const getStaticProps: GetStaticProps<IndexPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  const posts: Article[] = getAllArticles();
  return {
    props: {
      posts,
      ...(await serverSideTranslations(currentLocale, ["index", "common"])),
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ posts }: Readonly<IndexPageProps>) => {
  const { author, title, description } = appConfig;
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <NextSeo title="Home Page" description={description} />
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Image
          className="rounded-lg border-4 border-spring-wood-200/[.5] dark:border-neutral-800/[.5] shadow-lg brightness-100 contrast-100"
          src={author.image}
          width={300}
          height={300}
          alt={title}
        />
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl text-center md:text-left">
            <Translation t={t} i18nKey="me" components={[<strong className="text-6xl" key="name" />]}></Translation>
          </h1>
          <p className="leading-loose">
            <Translation t={t} i18nKey="titles"></Translation>
          </p>
          <p className="leading-loose">
            <Translation
              t={t}
              i18nKey="presentation"
              components={{
                bold: <strong key={"bold"} />,
                blog: <Link href={"/blog"} />,
              }}
            ></Translation>
          </p>
        </div>
      </div>
      <PageSection>
        <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
      </PageSection>
      <ArticlesList articles={posts} />
      <Link href={"/blog"} className="text-sm">
        <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
      </Link>
    </>
  );
};

export default IndexPage;
