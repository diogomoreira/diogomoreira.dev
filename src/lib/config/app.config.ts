import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFlask, faGraduationCap, faHome, faLink, faPenNib, faUser } from "@fortawesome/free-solid-svg-icons";
import { GiscusProps } from "@giscus/react";
import packageJson from "package.json";

type ApplicationConfig = {
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  siteLocale: string;
  siteVersion: string;
  author: { [key: string]: string };
  giscus: GiscusProps;
  menu: {
    name: string;
    link: string;
    icon: IconProp;
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
    image: "images/profile.jpg",
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
  giscus: {
    repo: "diogomoreira/diogodmoreira.com",
    repoId: "MDEwOlJlcG9zaXRvcnkzNjM3NTY5NTM=",
    category: "General",
    categoryId: "DIC_kwDOFa59mc4CV9_B",
    mapping: "url",
    term: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    theme: "dark_protanopia",
    lang: "en",
    loading: "lazy",
  },
  menu: [
    { name: "Home", link: "/", icon: faHome },
    { name: "About", link: "/about", icon: faUser },
    { name: "Notes", link: "/notes", icon: faPenNib },
    {
      name: "Academic",
      link: "/academic",
      icon: faGraduationCap,
    },
    { name: "Labs", link: "/labs", icon: faFlask },
    { name: "Links", link: "/links", icon: faLink },
  ],
};

const useAppConfig = () => {
  return appConfig;
};

export { appConfig, useAppConfig };
