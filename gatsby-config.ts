import queries from "./src/utils/algolia/queries";
import feed from "./config/feed.config";
import type { GatsbyConfig } from "gatsby";
import menu from "./config/menu.config";
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Diogo Moreira",
    description: "My thoughts about life, software development, games, music and so forth",
    author: "Diogo Moreira",
    keywords: ["software development", "teaching"],
    siteUrl: `https://diogodmoreira.com/`,
    social: {
      twitter: "https://twitter.com/diogodmoreira",
      github: "https://github.com/diogomoreira",
      linkedin: "https://www.linkedin.com/in/diogodmoreira",
      instagram: "https://www.instagram.com/diogo.dmoreira",
    },
    menu,
  },
  plugins: [
    "gatsby-transformer-json",
    { resolve: "gatsby-plugin-feed", options: feed },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/images/`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages/`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/collections/`,
        name: "collections",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/publications`,
        name: "publications",
      },
    },
    "gatsby-transformer-bibtex",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-plugin-algolia",
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: queries,
        chunkSize: 1000,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-dark-mode",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-remark-images",
    "gatsby-remark-prismjs",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
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
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Diogo Moreira",
        start_url: "/blog",
        background_color: `#000`,
        display: `standalone`,
        icon: `${__dirname}/content/images/logo.png`,
      },
    },
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: "true",
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.DISQUS_SHORTNAME,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Inconsolata\:700`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `blue`,
        showSpinner: true,
      },
    },
    "gatsby-plugin-resolve-src",
  ],
};

export default config;
