import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Diogo Moreira",
    description: "My thoughts about life, software development, games, music and so forth",
    author: {
      name: "Diogo Moreira",
      description: "Software Engineer and Professor. Trying my best to make things worth.",
    },
    keywords: ["software development", "teaching"],
    siteUrl: `https://diogodmoreira.com/`,
    social: {
      twitter: "https://twitter.com/diogodmoreira",
      github: "https://github.com/diogomoreira",
      linkedin: "https://www.linkedin.com/in/diogodmoreira",
      instagram: "https://www.instagram.com/diogo.dmoreira",
    },
    menu: [
      { name: "menu.blog", link: "/blog", external: false },
      { name: "menu.academic", link: "/academic", external: false },
      { name: "menu.labs", link: "/labs", external: false },
      { name: "menu.links", link: "/links", external: false },
      { name: "menu.cv", link: "/cv.pdf", external: true },
    ],
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: process.env.NODE_ENV === "development",
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "4564656",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./src/images/logo.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static/assets",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1100,
            },
          },
          "gatsby-remark-external-links",
          "gatsby-remark-smartypants",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-katex",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: "diogomoreira",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-bibtex",
    "gatsby-transformer-json",
    "gatsby-plugin-dark-mode",
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: path.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/blog/",
      },
      __key: "posts",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "collections",
        path: "./src/collections/",
      },
      __key: "collections",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "publications",
        path: "./src/publications/",
      },
      __key: "publications",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "static",
        path: "./static/",
      },
      __key: "static",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "locale",
        path: "./i18n/l10n",
      },
      __key: "locale",
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Anek Latin\:100,300,500,600`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./i18n/l10n`,
        i18nextOptions: {
          ns: ["translation"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.GATSBY_DISQUS_SHORTNAME,
      },
    },
  ],
};

export default config;
