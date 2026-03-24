import BorderedPicture from "@/components/BorderedImage";
import PageSection from "@/components/PageSection";
import { appConfig } from "@/config/app.config";
import { Content, getContentFromDirectory } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";

type IndexPageStaticProps = { posts: Content[] };

export const getStaticProps: GetStaticProps<IndexPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  const posts: Content[] = getContentFromDirectory("posts");
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
      <div id="info" className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div>
          <BorderedPicture src={author.image} width={250} height={250} alt={title} />
        </div>
        <div className="flex-1">
          <h1 className="mb-6 font-bold text-4xl lg:text-5xl text-center md:text-left">Diogo Moreira</h1>
          <div className="relative text-lg flex items-center">
            <span className="shrink text-base-content">Software Engineer. Professor.</span>
          </div>
        </div>
      </div>
      <div id="latest" className="col-span-2">
        <PageSection>A little bit about me</PageSection>
        <div className="prose max-w-none">
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
        <PageSection>Academic</PageSection>
      </div>
    </>
  );
};

export default IndexPage;
