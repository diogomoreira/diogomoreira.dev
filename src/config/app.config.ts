import packageJson from "package.json";
import { IconType } from "react-icons";
import { FaHouseChimney, FaUser, FaPenNib, FaGraduationCap, FaFlask, FaBookmark } from "react-icons/fa6";

type ApplicationConfig = {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  siteLocale: string;
  siteVersion: string;
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
  siteLocale: "en-US",
  siteVersion: packageJson.version,
  author: {
    name: "Diogo Moreira",
    image: "/images/profile_photo.jpg",
    email: "diogo.dmoreira@gmail.com",
    academicEmail: "diogo.moreira@ifpb.edu.br",
    github: "diogomoreira",
    twitter: "diogodmoreira",
    linkedin: "diogodmoreira",
    instagram: "diogo.dmoreira",
    keybase: "diogomoreira",
    mastodon: "diogomoreira",
    googleScholar: "DlSdlvEAAAAJ",
    researchGate: "Diogo_Moreira4",
    orcid: "0000-0003-1803-6565",
    lattes: "2745996619940977",
  },
  menu: [
    { name: "Home", link: "/", icon: FaHouseChimney },
    { name: "About", link: "/about", icon: FaUser },
    { name: "Notes", link: "/notes", icon: FaPenNib },
    {
      name: "Academic",
      link: "/academic",
      icon: FaGraduationCap,
    },
    { name: "Labs", link: "/labs", icon: FaFlask },
    { name: "Bookmarks", link: "/bookmarks", icon: FaBookmark },
  ],
};

const useAppConfig = () => {
  return appConfig;
};

export { appConfig, useAppConfig };
