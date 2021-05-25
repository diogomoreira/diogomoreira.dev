import React from "react"
import SEO from "components/SEO"
import Author from "components/Author"
import { graphql } from "gatsby"
import Layout from "components/Layout"
import LatestPosts from "components/LatestPosts"
import Container from "components/Container"

const IndexPage = ({ data }) => {
  const { image } = data
  return (
    <Layout>
      <SEO title="Sobre" />
      <Container>
        <Author image={image} />
        <LatestPosts />
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    image: file(relativePath: { eq: "profile_photo.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 350, height: 350)
      }
    }
  }
`
