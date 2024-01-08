import LinksPageItem from "@/components/LinksPageItem";
import { useAppConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Trans as Translation, useTranslation } from "next-i18next";
import { RiMastodonFill, RiLinkedinBoxFill, RiTwitterFill, RiGithubFill, RiInstagramFill } from "react-icons/ri";
import { capitalize } from "lodash";
import { FaLink } from "react-icons/fa6";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["links", "index", "common"])),
    },
  };
};

type LinksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LinksPage: NextPage<LinksPageProps> = () => {
  const { t } = useTranslation(["links", "index", "common"]);
  const { author, siteUrl } = useAppConfig();
  const { github, twitter, linkedin, instagram, mastodon } = author;
  const social = [
    { key: "instagram", link: `https://instagram.com/${instagram}`, icon: RiInstagramFill },
    { key: "github", link: `https://github.com/${github}`, icon: RiGithubFill },
    { key: "twitter", link: `https://twitter.com/${twitter}`, icon: RiTwitterFill },
    { key: "linkedin", link: `https://linkedin.com/in/${linkedin}`, icon: RiLinkedinBoxFill },
    { key: "mastodon", link: `https://mastodon.social/@${mastodon}`, icon: RiMastodonFill },
  ];
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="">
        <Image className="rounded-full" src={author.image} width={175} height={175} alt={author.name} />
      </div>
      <h1 className="text-4xl font-bold">{author.name}</h1>
      <h2 className="text-xl font-light text-slate-800 dark:text-slate-400">
        <Translation t={t} ns={"index"} i18nKey="titles"></Translation>
      </h2>
      <div className="flex flex-col w-full gap-2 md:w-3/4">
        <LinksPageItem icon={<FaLink />} description={t("website")} href={`${siteUrl}`} />
        {social.map(socialItem => {
          const SocialIcon = socialItem.icon;
          return (
            <LinksPageItem
              key={socialItem.key}
              icon={<SocialIcon />}
              description={capitalize(socialItem.key)}
              href={socialItem.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LinksPage;
