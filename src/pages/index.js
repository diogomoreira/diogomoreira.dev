import React from "react"
import { Layout } from "components/Layout"
import SEO from "components/SEO"
import Author from "components/Author"
import { graphql } from "gatsby"
import LatestPosts from "components/LatestPosts"

const IndexPage = ({ data }) => {
  const { image } = data
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <SEO title="Sobre" />
      <Author image={image} />
      <LatestPosts posts={posts} />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    image: file(relativePath: { eq: "profile_photo.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allMarkdownRemark(
      limit: 5
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          cover {
            childImageSharp {
              gatsbyImageData(quality: 70, webpOptions: { quality: 90 })
              resize {
                src
                width
                height
              }
            }
          }
          date(formatString: "LL", locale: "pt-br")
          description
          tags
          comments
        }
        fields {
          slug
        }
      }
    }
  }
`
