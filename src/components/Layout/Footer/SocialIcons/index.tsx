import React from "react";
import { useAppConfig } from "@/config";
import capitalize from "lodash/capitalize";
import styles from "@/styles/components/socialicons.module.scss";
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
    { key: "keybase", link: `https://keybase.io/${keybase}`, icon: RiKeyFill },
    { key: "mastodon", link: `https://mastodon.social/@${mastodon}`, icon: RiMastodonFill },
  ];

  return (
    <div className={styles.socialIconsContainer}>
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
