import React from "react"
import { graphql } from "gatsby"
import ResearchItem from "components/ResearchItem"
import SEO from "components/SEO"
import Container from "components/Container"
import Content from "components/Content"
import Layout from "components/Layout"

export default function Research({ data }) {
  return (
    <Layout>
      <SEO title="Pesquisa" pathname="research" />
      <Container>
        <h1>Pesquisa</h1>
        <Content>
          <p className="lh-lg">
            Uma lista das minhas publicações pode ser encontrada abaixo, assim
            como as entradas <code>bibtex</code> para citações e o link para o
            artigo. Sinta-se a vontade para entrar em contato no{" "}
            <a href="mailto:diogo.moreira@ifpb.edu.br">
              diogo.moreira [at] ifpb.edu.br
            </a>{" "}
            caso queira discutir algum dos artigos ou solicitar materiais
            adicionais, ficarei feliz em ajudar.
          </p>
          <p className="mb-5 lh-lg">
            Meus interesses de pesquisa são principalmente relacionados a
            Engenharia de Software, especialmente{" "}
            <strong>Testes de Software</strong>,{" "}
            <strong>Qualidade de Software</strong> e{" "}
            <strong>Padrões de Projeto</strong>. Também sou membro do{" "}
            <a href="https://gpes.github.io" target="_blank">
              Grupo de Pesquisa em Engenharia de Software
            </a>{" "}
            (IFPB, Brasil). Caso deseje, veja meu perfil no{" "}
            <a
              href="https://www.researchgate.net/profile/Diogo_Moreira4"
              target="_blank"
            >
              Research Gate
            </a>
            ,{" "}
            <a
              href="https://scholar.google.com.br/citations?hl=pt-BR&amp;user=DlSdlvEAAAAJ"
              target="_blank"
            >
              Google Scholar
            </a>
            ,{" "}
            <a href="https://orcid.org/0000-0003-1803-6565" target="_blank">
              ORCID
            </a>{" "}
            ou{" "}
            <a href="http://lattes.cnpq.br/2745996619940977" target="_blank">
              Lattes
            </a>
            .
          </p>
        </Content>
      </Container>
      <Container>
        {data.allReference.nodes.map((researchItem, i) => {
          return <ResearchItem key={i} researchItem={researchItem} />
        })}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query BibTexReferences {
    allReference(sort: { fields: year, order: DESC }) {
      nodes {
        title
        abstract
        authors
        doi
        url
        year
        journal
        booktitle
        id
        raw
      }
    }
  }
`
