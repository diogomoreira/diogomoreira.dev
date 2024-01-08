import { Content } from "@/components/Layout/Content";

import LinksPageItem from "@/components/LinksPageItem";
import { useAppConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import styles from "@/styles/pages/links.module.scss";
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["links", "common"])),
    },
  };
};

type LinksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LinksPage: NextPage<LinksPageProps> = () => {
  const { t } = useTranslation(["links", "common"]);
  const { author, siteUrl } = useAppConfig();
  return (
    <>
      <div className={styles.profilePhotoContainer}>
        <Image src={author.image} width={175} height={175} alt={author.name} className={styles.profilePhoto} />
      </div>
      <div className={styles.presentation}>
        <h1 className={styles.title}>{author.name}</h1>
      </div>
      <div className={styles.presentation}>
        <SocialIcons />
      </div>
      <div className={styles.links}>
        <LinksPageItem icon="🔗" description={t("website")} href={`${siteUrl}`} />
        <LinksPageItem icon="🛠️" description={t("uses")} href={`${siteUrl}/uses`} />
      </div>
    </>
  );
};

export default LinksPage;
