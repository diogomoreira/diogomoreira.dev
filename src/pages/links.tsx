import React from "react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import algoliasearch from "algoliasearch";
import { PageTitle } from "../styles/typography";
import { graphql, PageProps } from "gatsby";
import { CardItem, ListItem, PinItem } from "../components/Item";
import { useTranslation } from "react-i18next";
import { threeColumnBreakPoints } from "../utils/masonry/breakpoints";
import Content from "../components/Content";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import InstantSearchBox from "../components/InstantSearchBox";
import PinRefinementList from "../components/PinRefinementList";
import PinHitsGrid from "../components/PinHitsGrid";
import ItemMasonry from "../components/Masonry";

const LinksPage = ({ data }: PageProps<Queries.LinksQuery>) => {
  const algoliaAppId = process.env.ALGOLIA_APP_ID;
  const algoliaAPIKey = process.env.ALGOLIA_API_KEY;
  const searchClient = algoliasearch(algoliaAppId!, algoliaAPIKey!);
  const indexName = process.env.ALGOLIA_LINKS_INDEX_NAME;
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO title="Links" pathname="links" />
      <PageTitle>Links</PageTitle>
      <Content>
        <p>{t("links.intro")}</p>
      </Content>
      <ItemMasonry columns={3}>
        {data.allLinksJson.edges.map(({ node }) => (
          <CardItem
            id={node.id}
            title={node.title}
            date={node.publishDate}
            link={node.link}
            content={node.description}
            image={node.image?.childImageSharp?.gatsbyImageData}
            tags={node.tags}
          />
        ))}
      </ItemMasonry>
    </Layout>
  );
};

export const query = graphql`
  query Links($locale: String) {
    allLinksJson(filter: { lang: { eq: $locale } }, sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          id
          title
          type
          tags
          publishDate(locale: $locale, formatString: "LL")
          link
          description
          image {
            childImageSharp {
              gatsbyImageData(quality: 70, webpOptions: { quality: 90 })
            }
          }
        }
      }
    }
  }
`;

export default LinksPage;
