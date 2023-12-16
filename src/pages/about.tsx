import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import styles from "@/styles/pages/about.module.scss";
import contentStyle from "@/styles/pages/slug.module.scss";
import Image from "next/image";
import { useAppConfig } from "@/config";
import Link from "next/link";
import { Content } from "@/components/Layout/Content";
import { Trans as Translation, useTranslation } from "next-i18next";

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const AboutPage: NextPage<AboutPageProps> = () => {
  const {
    author: { name },
  } = useAppConfig();
  const { t } = useTranslation("about");

  return (
    <Content>
      <NextSeo title="About me" description="A little more about me" />
      <h1>👋🏻 {t("title")}</h1>
      <div className={styles.cover}>
        <Image src={"/images/pages/about/cover.jpg"} fill alt={name} />
      </div>
      <div className={contentStyle.content}>
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
      </div>
    </Content>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["about", "common"])),
    },
  };
};

export default AboutPage;
