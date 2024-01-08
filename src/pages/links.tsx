import LinksPageItem from "@/components/LinksPageItem";
import { useAppConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
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
      <div>
        <Image src={author.image} width={175} height={175} alt={author.name} />
      </div>
      <div>
        <h1>{author.name}</h1>
      </div>
      <div>
        <SocialIcons />
      </div>
      <div>
        <LinksPageItem icon="🔗" description={t("website")} href={`${siteUrl}`} />
        <LinksPageItem icon="🛠️" description={t("uses")} href={`${siteUrl}/uses`} />
      </div>
    </>
  );
};

export default LinksPage;
