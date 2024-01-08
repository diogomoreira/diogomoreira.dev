import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useAppConfig } from "@/config";
import Link from "next/link";
import { Trans as Translation, useTranslation } from "next-i18next";

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const AboutPage: NextPage<AboutPageProps> = () => {
  const {
    author: { name },
  } = useAppConfig();
  const { t } = useTranslation("about");

  return (
    <>
      <NextSeo title="About me" description="A little more about me" />
      <h1 className="text-4xl mb-6 font-bold">👋🏻 {t("title")}</h1>
      <figure className="relative w-full h-96 prose-img:rounded-md shadow-md">
        <Image className="object-cover" src={"/images/pages/about/cover.jpg"} fill alt={name} />
      </figure>
      <article className="mt-8 prose prose-slate mx-auto lg:prose-lg dark:prose-invert">
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
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, deleniti minima laboriosam ratione a et
          aliquid est? Mollitia doloremque inventore, debitis saepe odit corporis animi iusto totam illum nam aliquam.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, deleniti minima laboriosam ratione a et
          aliquid est? Mollitia doloremque inventore, debitis saepe odit corporis animi iusto totam illum nam aliquam.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, deleniti minima laboriosam ratione a et
          aliquid est? Mollitia doloremque inventore, debitis saepe odit corporis animi iusto totam illum nam aliquam.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, deleniti minima laboriosam ratione a et
          aliquid est? Mollitia doloremque inventore, debitis saepe odit corporis animi iusto totam illum nam aliquam.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, deleniti minima laboriosam ratione a et
          aliquid est? Mollitia doloremque inventore, debitis saepe odit corporis animi iusto totam illum nam aliquam.
        </p>
      </article>
    </>
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
