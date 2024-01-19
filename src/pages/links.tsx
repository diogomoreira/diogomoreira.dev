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
    <div className="links-container">
      <Image className="links-avatar" src={author.image} width={175} height={175} alt={author.name} />
      <h1 className="links-title">{author.name}</h1>
      <h2 className="links-presentation">
        <Translation t={t} ns={"index"} i18nKey="titles"></Translation>
      </h2>
      <div className="links-items">
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
