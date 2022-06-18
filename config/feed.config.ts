const siteTitle = process.env.SITE_TITLE;
const feedTitle = `${siteTitle}'s RSS Feed`;

const feed = {
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
        return allMarkdownRemark.nodes.map(node => {
          return Object.assign({}, node.frontmatter, {
            description: node.excerpt,
            date: node.frontmatter.date,
            url: site.siteMetadata.siteUrl + node.fields.slug,
            guid: site.siteMetadata.siteUrl + node.fields.slug,
            custom_elements: [{ "content:encoded": node.html }],
          });
        });
      },
      query: `
        {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
          ) {
            nodes {
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
      `,
      output: "/rss.xml",
      title: feedTitle,
      match: "^/blog/",
    },
  ],
};

export default feed;
