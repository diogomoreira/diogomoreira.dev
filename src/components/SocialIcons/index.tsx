import { useAppMetadata } from "@/lib/config";
import styles from "@/styles/components/social-icons.module.scss";
import {
  IconDefinition,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SocialItem = { link: string; icon: IconDefinition };

const SocialIcons = () => {
  const { author } = useAppMetadata();
  const socialKeys = [
    { key: "instagram", link: "https://instagram.com/", icon: faInstagram },
    { key: "github", link: "https://github.com/", icon: faGithub },
    { key: "twitter", link: "https://twitter.com/", icon: faTwitter },
    { key: "linkedin", link: "https://linkedin.com/in/", icon: faLinkedin },
  ];
  const social: SocialItem[] = socialKeys.map<SocialItem>((socialKey) => ({
    link: `${socialKey.link}${author[socialKey.key]}`,
    icon: socialKey.icon,
  }));

  return (
    <div className={styles.socialIconsContainer}>
      {social.map((socialItem, idx) => (
        <a key={idx} href={socialItem.link} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={socialItem.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
