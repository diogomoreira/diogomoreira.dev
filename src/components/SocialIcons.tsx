import { appConfig } from "@/config/app.config";
import capitalize from "lodash/capitalize";
import { RiGithubFill, RiInstagramFill, RiLinkedinBoxFill, RiMailFill, RiMastodonFill } from "react-icons/ri";

const SocialIcons = () => {
  const {
    author: {
      externalLinks: { instagram, github, linkedin, mastodon, email },
    },
  } = appConfig;

  const social = [
    { key: "instagram", link: instagram, icon: RiInstagramFill },
    { key: "github", link: github, icon: RiGithubFill },
    { key: "linkedin", link: linkedin, icon: RiLinkedinBoxFill },
    { key: "mastodon", link: mastodon, icon: RiMastodonFill },
    { key: "email", link: email, icon: RiMailFill },
  ];

  return (
    <div className="flex w-full gap-2 text-xl text-base-content justify-center md:justify-start">
      {social.map(socialItem => {
        const SocialIcon = socialItem.icon;
        return (
          <a key={socialItem.key} title={`Link for ${capitalize(socialItem.key)}`} href={socialItem.link} rel="me">
            <SocialIcon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
