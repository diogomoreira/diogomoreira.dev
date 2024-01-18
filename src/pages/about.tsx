import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useAppConfig } from "@/config";
import Link from "next/link";
import { Trans as Translation, useTranslation } from "next-i18next";
import PageTitle from "@/components/PageTitle";
import PageProse from "@/components/PageProse";
import PageFigure from "@/components/PageFigure";
import PageDescription from "@/components/PageDescription";

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
      <PageTitle>👋🏻 {t("title")}</PageTitle>
      <PageDescription>A little bit about myself</PageDescription>
      <PageFigure>
        <Image className="object-cover" src={"/images/pages/about/cover.jpg"} fill alt={name} />
      </PageFigure>
      <article>
        <PageProse>
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
              components={[
                <a key={"link-ifpb"} href="https://ifpb.edu.br" target="_blank" rel="noopener noreferrer" />,
              ]}
            ></Translation>
          </p>
          <p>
            <Translation t={t} i18nKey="end"></Translation>
          </p>
        </PageProse>
      </article>
    </>
  );
};

export default AboutPage;
