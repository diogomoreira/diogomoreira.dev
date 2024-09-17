import PageTitle from "@/components/PageTitle";
import { GetStaticProps } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["about", "common"])),
    },
  };
};

export default function AboutPage() {
  const { t } = useTranslation("about");
  return (
    <>
      <NextSeo title="About me" description="My personal profile" />
      <PageTitle>About me</PageTitle>
      <Image
        className="mx-auto rounded-lg border-4 border-spring-wood-200/[.5] dark:border-neutral-800/[.5] shadow-lg"
        src={"/images/pages/about/cover.jpg"}
        width={1920}
        height={1080}
        alt="Diogo Moreira"
      />
      <p>
        <Translation t={t} i18nKey="intro" components={{ strong: <strong /> }} />
      </p>

      <p>
        <Translation
          t={t}
          i18nKey="hobbies"
          components={{ strong: <strong />, linkBookmarks: <Link href={"/bookmarks"} /> }}
        />
      </p>
      <p>{t("end")}</p>
    </>
  );
}
