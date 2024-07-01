import PageTitle from "@/components/PageTitle";
import { useAppConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["about", "common"])),
    },
    revalidate: 5,
  };
};

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const AboutPage: NextPage<AboutPageProps> = () => {
  const {
    author: { name },
  } = useAppConfig();
  const { t } = useTranslation("about");

  return (
    <>
      <NextSeo title="About me" description="A little more about me" />
      <PageTitle>{t("title")}</PageTitle>
      <p className="mx-auto md:px-0 mt-2 leading-loose mb-6">A little bit about myself</p>
      <figure className="relative w-full h-72 shadow-lg">
        <Image className="object-cover rounded-md" src={"/images/pages/about/cover.jpg"} fill alt={name} />
      </figure>
      <article className="mt-8 prose max-w-none mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-strong:font-medium">
        <p>
          <Translation t={t} i18nKey="intro"></Translation>
        </p>
        <p>
          <Translation t={t} i18nKey="hobbies" components={[<Link key={"link"} href={"/bookmarks"} />]}></Translation>
        </p>
        <p>
          <Translation t={t} i18nKey="sport"></Translation>
        </p>
        <p>
          <Translation t={t} i18nKey="freetime"></Translation>
        </p>
        <p>
          <Translation
            t={t}
            i18nKey="education"
            components={[<a key={"link-ifpb"} href="https://ifpb.edu.br" target="_blank" rel="noopener noreferrer" />]}
          ></Translation>
        </p>
        <p>
          <Translation t={t} i18nKey="end"></Translation>
        </p>
      </article>
    </>
  );
};

export default AboutPage;
