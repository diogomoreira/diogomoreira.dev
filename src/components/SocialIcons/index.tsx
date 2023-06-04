import React from "react";
import { useAppConfig } from "@/lib/config";
import capitalize from "lodash/capitalize";
import styles from "@/styles/components/socialicons.module.scss";
import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const SocialIcons = () => {
  const {
    author: { instagram, github, twitter, linkedin, keybase },
  } = useAppConfig();

  const social = [
    { key: "instagram", link: `https://instagram.com/${instagram}`, icon: faInstagram },
    { key: "github", link: `https://github.com/${github}`, icon: faGithub },
    { key: "twitter", link: `https://twitter.com/${twitter}`, icon: faTwitter },
    { key: "linkedin", link: `https://linkedin.com/in/${linkedin}`, icon: faLinkedin },
    { key: "keybase", link: `https://keybase.io/${keybase}`, icon: faKey },
  ];

  return (
    <div className={styles.socialIconsContainer}>
      {social.map(socialItem => (
        <a
          key={uuidv4()}
          title={`Link for ${capitalize(socialItem.key)}`}
          href={socialItem.link}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={socialItem.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
