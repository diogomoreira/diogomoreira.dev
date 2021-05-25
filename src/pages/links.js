import React from "react"
import SEO from "components/SEO"
import { InstantSearch } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch"

import Layout from "components/Layout"
import InstantSearchBox from "components/InstantSearchBox"
import PinRefinementList from "components/PinRefinementList"
import PinHitsGrid from "components/PinHitsGrid"
import Container from "components/Container"
import Content from "components/Content"

const Links = ({ data }) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  )
  const indexName = process.env.GATSBY_ALGOLIA_LINKS_INDEX_NAME

  return (
    <Layout>
      <SEO title="Links" pathname="links" />
      <Container>
        <h1>Links</h1>
        <Content>
          <p>
            Inspirado no site do{" "}
            <strong>
              <a href="https://crisdias.link/">Cris Dias</a>
            </strong>
            , decidi criar essa seção no meu site. Aqui eu reuno um pouco do que
            eu ando lendo, assistindo, escutando ou jogando. Os links aqui levam
            para os sites de stream ou lojas para que você possa comprar ou
            assinar um serviço. Fique a vontade para me reportar alguma
            informação errada aqui. Navegue pelas <b>categorias</b> se preferir
            ou digite um termo na caixa de busca.
          </p>
        </Content>
      </Container>
      <Container>
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <InstantSearchBox />
          <PinRefinementList
            attribute="type"
            searchable={false}
            operator="and"
          />
          <PinHitsGrid />
        </InstantSearch>
      </Container>
    </Layout>
  )
}

export default Links
