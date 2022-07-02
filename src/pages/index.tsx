import { graphql, PageProps } from "gatsby";
import React from "react";
import Author from "../components/Author";
import Layout from "../components/Layout";
import { ListItem } from "../components/Item";
import SEO from "../components/SEO";
import { SectionTitle } from "../styles/typography";
import { useTranslation } from "react-i18next";

const IndexPage = ({ data }: PageProps<Queries.IndexBlogPostsQuery>) => {
  const latestPosts = data.allMdx.nodes;
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO title="Sobre" />
      <Author />
      <SectionTitle>{t("index.latest")}</SectionTitle>
      {latestPosts.map((post: any, idx: any) => (
        <ListItem
          key={idx}
          id={post.id}
          title={post.frontmatter.title}
          content={post.frontmatter.description}
          link={`/blog/${post.frontmatter.slug}`}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          image={post.frontmatter.cover.childImageSharp.gatsbyImageData}
        />
      ))}
    </Layout>
  );
};

export const query = graphql`
  query IndexBlogPosts($locale: String) {
    allMdx(filter: { fields: { locale: { eq: $locale } } }, sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          cover {
            childImageSharp {
              gatsbyImageData(quality: 70, webpOptions: { quality: 90 }, height: 200)
            }
          }
          date(locale: $locale, formatString: "LL")
          description
          tags
          comments
          slug
        }
        timeToRead
      }
    }
  }
`;

export default IndexPage;
