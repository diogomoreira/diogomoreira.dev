import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import ProjectCardItem from "components/ProjectCardItem"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { twoColumnBreakPoints } from "utils/masonry/breakpoints"
import { Layout } from "components/Layout"
import Container from "components/Container"
import Content from "components/Content"

const Labs = ({ data }) => {
  const projects = data.allProjectsJson.nodes
  return (
    <Layout>
      <SEO title="Labs" pathname="labs" />
      <Container className="py-3">
        <h1 className="page-title">Labs</h1>
        <Content>
          <p className="lh-lg">
            Aqui uma lista com alguns dos meus projetos pessoais, desenvolvidos
            principalmente enquanto estudo alguma tecnologia nova. Atualmente
            estudando/praticando <b>React</b> e <b>TypeScript</b>, juntamente
            com algumas ferramentas para testes automatizados, como <b>Jest</b>
          </p>
        </Content>
      </Container>

      <Container>
        <ResponsiveMasonry columnsCountBreakPoints={twoColumnBreakPoints}>
          <Masonry gutter="1rem">
            {projects.map(project => (
              <ProjectCardItem project={project} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
    </Layout>
  )
}

export default Labs

export const query = graphql`
  query LabsPageQuery {
    allProjectsJson {
      nodes {
        id
        title
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
`
