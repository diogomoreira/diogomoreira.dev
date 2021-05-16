require("dotenv").config()

const queries = require(`${__dirname}/src/utils/algolia/queries`)

module.exports = {
  siteMetadata: {
    title: "Diogo Moreira",
    description:
      "My thoughts about life, software development, games, music and so forth",
    author: "Diogo Moreira",
    keywords: ["software development", "teaching"],
    siteUrl: `https://diogodmoreira.com/`,
    social: {
      twitter: "https://twitter.com/diogodmoreira",
      github: "https://github.com/diogomoreira",
      linkedin: "https://www.linkedin.com/in/diogodmoreira",
      instagram: "https://www.instagram.com/diogo.dmoreira",
    },
    menu: [
      { name: "Blog", link: "/blog" },
      { name: "Pesquisa", link: "/research" },
      { name: "Labs", link: "/labs" },
      { name: "Links", link: "/links" },
    ],
  },
  plugins: [
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Diogo Moreira RSS Feed",
          },
        ],
      },
    },
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
      // plugins: [`gatsby-transformer-json`],
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
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries,
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
        trackingId: process.env.GATSBY_GA_TRACKING_ID,
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
        shortname: process.env.GATSBY_DISQUS_SHORTNAME,
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter\:100,300,400,500,700,900`, // you can also specify font weights and styles
        ],
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
}
