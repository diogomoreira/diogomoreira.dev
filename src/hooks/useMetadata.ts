import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SITE_METADATA_QUERY {
      site {
        siteMetadata {
          title
          author {
            name
            description
          }
          description
          siteUrl
          social {
            github
            instagram
            linkedin
            twitter
          }
          menu {
            name
            link
          }
        }
      }
    }
  `);
  return site.siteMetadata;
};
