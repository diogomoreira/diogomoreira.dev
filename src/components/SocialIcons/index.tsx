import React from "react";
import { appConfig } from "@/config";
import capitalize from "lodash/capitalize";
import {
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiMastodonFill,
  RiTwitterFill,
} from "react-icons/ri";
import { generateUUID } from "../../utils/uuid";

const SocialIcons = () => {
  const {
    author: { instagram, github, twitter, linkedin, mastodon, email },
  } = appConfig;

  const social = [
    { key: "instagram", link: instagram, icon: RiInstagramFill },
    { key: "github", link: github, icon: RiGithubFill },
    { key: "twitter", link: twitter, icon: RiTwitterFill },
    { key: "linkedin", link: linkedin, icon: RiLinkedinBoxFill },
    { key: "mastodon", link: mastodon, icon: RiMastodonFill },
    { key: "email", link: email, icon: RiMailFill },
  ];

  return (
    <div className="flex w-full gap-2 text-xl text-spring-wood-600 dark:text-neutral-300 justify-center md:justify-start">
      {social.map(socialItem => {
        const SocialIcon = socialItem.icon;
        return (
          <a key={generateUUID()} title={`Link for ${capitalize(socialItem.key)}`} href={socialItem.link} rel="me">
            <SocialIcon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
