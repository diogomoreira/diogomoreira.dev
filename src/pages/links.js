import React from "react";
import SEO from "components/SEO";
import Layout from "components/Layout";
import InstantSearchBox from "components/InstantSearchBox";
import PinRefinementList from "components/PinRefinementList";
import PinHitsGrid from "components/PinHitsGrid";
import Container from "components/Container";
import Content from "components/Content";

import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";

import { PageTitle } from "styles/globalStyles";

const Links = ({ data }) => {
  const algoliaAppId = process.env.ALGOLIA_APP_ID;
  const algoliaAPIKey = process.env.ALGOLIA_API_KEY;
  const searchClient = algoliasearch(algoliaAppId, algoliaAPIKey);
  const indexName = process.env.ALGOLIA_LINKS_INDEX_NAME;

  console.log({ searchClient, indexName, algoliaAPIKey, algoliaAppId });

  return (
    <Layout>
      <SEO title="Links" pathname="links" />
      <Container>
        <PageTitle>Links</PageTitle>
        <Content>
          <p>
            Aqui eu reuno um pouco do que eu ando lendo, assistindo, escutando ou jogando. Os links aqui levam para os
            sites de stream ou lojas para que você possa comprar ou assinar um serviço. Fique a vontade para me reportar
            alguma informação errada aqui. Navegue pelas <b>categorias</b> se preferir ou digite um termo na caixa de
            busca.
          </p>
        </Content>
      </Container>
      <Container>
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <InstantSearchBox />
          <PinRefinementList attribute="type" searchable={false} operator="and" />
          <PinHitsGrid />
        </InstantSearch>
      </Container>
    </Layout>
  );
};

export default Links;
