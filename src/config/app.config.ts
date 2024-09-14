import { locales } from "./locale.config";

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
  }[];
};

const externalLinks: Record<string, string> = {
  email: "mailto:diogo.dmoreira@gmail.com",
  academicEmail: "mailto:diogo.moreira@ifpb.edu.br",
  instagram: "https://instagram.com/diogo.dmoreira",
  github: "https://github.com/diogomoreira",
  x: "https://x.com/diogodmoreira",
  linkedin: "https://linkedin.com/in/diogodmoreira",
  mastodon: "https://mastodon.social/@diogomoreira",
  googleScholar: "https://scholar.google.com.br/citations?hl=pt-BR&user=DlSdlvEAAAAJ",
  researchGate: "https://www.researchgate.net/profile/Diogo_Moreira4",
  orcid: "https://orcid.org/0000-0003-1803-6565",
  devto: "https://dev.to/diogomoreira",
  lattes: "https://lattes.cnpq.br/2745996619940977",
};

const appConfig: ApplicationConfig = {
  title: "Diogo Moreira",
  description: "My thoughts about life, software development, games, music and so forth",
  keywords: ["software development", "teaching"],
  siteUrl: process.env.NEXT_PUBLIC_CONTEXT === "production" ? "https://diogomoreira.dev/" : "http://localhost:3000",
  siteLocale: locales.en.code,
  siteVersion: "3.3",
  repository: "https://github.com/diogomoreira/diogomoreira.dev",
  author: {
    name: "Diogo Moreira",
    image: "/images/profile/front.jpg",
    ...externalLinks,
  },
  menu: [
    { name: "menu.home", link: "/" },
    { name: "menu.about", link: "/about" },
    { name: "menu.cv", link: "/cv" },
    { name: "menu.blog", link: "/blog" },
    { name: "menu.academic", link: "/academic" },
    { name: "menu.uses", link: "/uses" },
    { name: "menu.projects", link: "/projects" },
    { name: "menu.bookmarks", link: "/bookmarks" },
  ],
};

export { appConfig };
