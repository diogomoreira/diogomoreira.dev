import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { PageTitle, SectionTitle } from "../styles/typography";
import { ListItem } from "../components/Item";

const BlogPage = ({ data }: PageProps<Queries.BlogPostsQuery>) => {
  const blogYear = data.allMdx.group.sort((firstYear, secondYear) =>
    firstYear.fieldValue > secondYear.fieldValue ? -1 : 1,
  );
  const postsByYear = blogYear.map(year => {
    const currentYear = year.fieldValue;
    const posts = year.edges.map(({ node }) => (
      <ListItem
        id={node.id}
        title={node.frontmatter!.title}
        date={node.frontmatter!.date}
        link={`/blog/${node.frontmatter.slug}`}
        image={node.frontmatter!.cover?.childImageSharp?.gatsbyImageData}
        content={node.frontmatter!.description}
        tags={node.frontmatter?.tags}
      />
    ));
    return (
      <div>
        <SectionTitle>{currentYear}</SectionTitle>
        {posts}
      </div>
    );
  });

  return (
    <Layout>
      <SEO title="Blog" pathname="blog" />
      <PageTitle>Blog</PageTitle>
      {postsByYear}
    </Layout>
  );
};

export const query = graphql`
  query BlogPosts($locale: String) {
    allMdx(filter: { fields: { locale: { eq: $locale } } }, sort: { fields: frontmatter___date, order: DESC }) {
      group(field: frontmatter___year) {
        fieldValue
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(quality: 70, webpOptions: { quality: 90 })
                }
              }
              slug
              date(locale: $locale, formatString: "LL")
              description
              tags
            }
            timeToRead
          }
        }
      }
    }
  }
`;

export default BlogPage;
