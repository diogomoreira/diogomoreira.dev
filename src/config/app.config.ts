import packageJson from "package.json";
import { IconType } from "react-icons";
import { FaHouseChimney, FaUser, FaPenNib, FaGraduationCap, FaFlask, FaBookmark, FaComputer } from "react-icons/fa6";

type ApplicationConfig = {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  siteLocale: string;
  siteVersion: string;
  repository: string;
  author: { [key: string]: string };
  menu: {
    name: string;
    link: string;
    icon: IconType;
  }[];
};

const appConfig: ApplicationConfig = {
  title: "Diogo Moreira",
  description: "My thoughts about life, software development, games, music and so forth",
  keywords: ["software development", "teaching"],
  siteUrl: "https://diogodmoreira.com/",
  siteLocale: "en",
  siteVersion: packageJson.version,
  repository: "https://github.com/diogomoreira/diogodmoreira.com",
  author: {
    name: "Diogo Moreira",
    image: "/images/profile_photo.jpg",
    email: "diogo.dmoreira@gmail.com",
    academicEmail: "diogo.moreira@ifpb.edu.br",
    github: "diogomoreira",
    twitter: "diogodmoreira",
    linkedin: "diogodmoreira",
    instagram: "diogo.dmoreira",
    mastodon: "diogomoreira",
    googleScholar: "DlSdlvEAAAAJ",
    researchGate: "Diogo_Moreira4",
    orcid: "0000-0003-1803-6565",
    lattes: "2745996619940977",
  },
  menu: [
    { name: "menu.home", link: "/", icon: FaHouseChimney },
    { name: "menu.about", link: "/about", icon: FaUser },
    { name: "menu.blog", link: "/blog", icon: FaPenNib },
    {
      name: "menu.academic",
      link: "/academic",
      icon: FaGraduationCap,
    },
    {
      name: "menu.uses",
      link: "/uses",
      icon: FaComputer,
    },
    { name: "menu.labs", link: "/labs", icon: FaFlask },
    { name: "menu.bookmarks", link: "/bookmarks", icon: FaBookmark },
  ],
};

const useAppConfig = () => {
  return appConfig;
};

export { appConfig, useAppConfig };
