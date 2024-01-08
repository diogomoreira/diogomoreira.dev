import React from "react";
import { useAppConfig } from "@/config";
import capitalize from "lodash/capitalize";
import { v4 as uuidv4 } from "uuid";
import {
  RiMastodonFill,
  RiKeyFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
  RiGithubFill,
  RiInstagramFill,
} from "react-icons/ri";

const SocialIcons = () => {
  const {
    author: { instagram, github, twitter, linkedin, keybase, mastodon },
  } = useAppConfig();

  const social = [
    { key: "instagram", link: `https://instagram.com/${instagram}`, icon: RiInstagramFill },
    { key: "github", link: `https://github.com/${github}`, icon: RiGithubFill },
    { key: "twitter", link: `https://twitter.com/${twitter}`, icon: RiTwitterFill },
    { key: "linkedin", link: `https://linkedin.com/in/${linkedin}`, icon: RiLinkedinBoxFill },
    { key: "mastodon", link: `https://mastodon.social/@${mastodon}`, icon: RiMastodonFill },
  ];

  return (
    <div className="flex w-full gap-2 text-3xl text-slate-600 dark:text-slate-300 md:text-2xl justify-center md:justify-start">
      {social.map(socialItem => {
        const SocialIcon = socialItem.icon;
        return (
          <a key={uuidv4()} title={`Link for ${capitalize(socialItem.key)}`} href={socialItem.link} rel="me">
            <SocialIcon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
