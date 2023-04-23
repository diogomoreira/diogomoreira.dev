import {
  faFlask,
  faGraduationCap,
  faHome,
  faLink,
  faNoteSticky,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import packageJson from "package.json";

const AppMetadata = {
  title: "Diogo Moreira",
  description:
    "My thoughts about life, software development, games, music and so forth",
  keywords: ["software development", "teaching"],
  siteUrl: `https://diogodmoreira.com/`,
  siteLocale: "en-US",
  siteVersion: packageJson.version,
  author: {
    name: "Diogo Moreira",
    email: "diogo.dmoreira@gmail.com",
    github: "diogomoreira",
    twitter: "diogodmoreira",
    linkedin: "diogodmoreira",
    instagram: "diogo.dmoreira",
    keybase: "diogomoreira",
  },
  menu: [
    { name: "Home", link: "/", icon: faHome },
    { name: "About", link: "/about", icon: faUser },
    { name: "Notes", link: "/notes", icon: faNoteSticky },
    {
      name: "Academic",
      link: "/academic",
      icon: faGraduationCap,
    },
    { name: "Labs", link: "/labs", icon: faFlask },
    { name: "Links", link: "/links", icon: faLink },
  ],
};

const useAppMetadata = () => {
  return AppMetadata;
};

export { AppMetadata, useAppMetadata };
