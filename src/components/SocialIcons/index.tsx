import { useAppMetadata } from "@/lib/config";
import styles from "@/styles/components/social-icons.module.scss";
import { IconDefinition, faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SocialItem = { link: string; icon: IconDefinition };

const SocialIcons = () => {
  const { author } = useAppMetadata();
  const social = [
    { key: "instagram", link: `https://instagram.com/${author.instagram}`, icon: faInstagram },
    { key: "github", link: `https://github.com/${author.github}`, icon: faGithub },
    { key: "twitter", link: `https://twitter.com/${author.twitter}`, icon: faTwitter },
    { key: "linkedin", link: `https://linkedin.com/in/${author.linkedin}`, icon: faLinkedin },
  ];

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
