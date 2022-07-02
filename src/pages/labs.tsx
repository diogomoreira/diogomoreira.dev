import React from "react";
import { graphql, PageProps } from "gatsby";
import SEO from "../components/SEO";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Layout from "../components/Layout";
import Content from "../components/Content";
import { PageTitle } from "../styles/typography";
import { twoColumnBreakPoints } from "../utils/masonry/breakpoints";
import { CardItem } from "../components/Item";
import { useTranslation } from "react-i18next";
import { StackItems } from "../styles/utils";
import styled from "styled-components";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import ItemMasonry from "../components/Masonry";

const TopicTag = styled.span`
  background-color: var(--tag-background);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
  color: var(--tag-foreground);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
`;

const LabsPage = ({ data }: PageProps<Queries.LabsPageQuery>) => {
  const projects = data.allProjectsJson.nodes;

  const { t } = useTranslation();
  return (
    <Layout>
      <SEO title="Labs" pathname="labs" />
      <PageTitle>Labs</PageTitle>
      <Content>
        <p>{t("labs.intro")}</p>
      </Content>
      <StackItems>
        {t("labs.stack", { returnObjects: true })?.map((tag, idx) => (
          <TopicTag key={idx}>{tag}</TopicTag>
        ))}
      </StackItems>

      <ItemMasonry columns={2}>
        {projects.map((project, i) => (
          <CardItem
            id={i}
            title={project.title}
            content={project.description}
            image={project.image.childImageSharp.gatsbyImageData}
            tags={project.stack}
          />
          // <ProjectCardItem key={i} project={project} />
        ))}
      </ItemMasonry>
    </Layout>
  );
};

export default LabsPage;

export const query = graphql`
  query LabsPage($locale: String) {
    allProjectsJson(filter: { lang: { eq: $locale } }, sort: { fields: date, order: DESC }) {
      nodes {
        id
        title
        date(locale: $locale, formatString: "LL")
        url
        description
        stack
        image {
          childImageSharp {
            gatsbyImageData(
              quality: 70
              webpOptions: { quality: 90 }
              pngOptions: { quality: 70 }
              jpgOptions: { quality: 90 }
            )
          }
        }
      }
    }
  }
`;
