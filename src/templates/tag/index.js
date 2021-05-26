import React from "react"
import { graphql } from "gatsby"
import kebabCase from "lodash.kebabcase"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import Layout from "components/Layout"
import SEO from "components/SEO"
import BlogPostCardItem from "components/BlogPostCardItem"
import { threeColumnBreakPoints } from "utils/masonry/breakpoints"
import Container from "components/Container"
import { TagTitle, TagTitleDetails } from "./styled"

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO
        title={tag}
        description={`${totalCount} posts marcados com #${tag}`}
        pathname={`tags/${kebabCase(tag)}`}
      />
      <Container>
        <h1>Blog</h1>
        <TagTitle>
          Tag #<code>{tag}</code> -{" "}
          <TagTitleDetails>
            {totalCount} {totalCount > 1 ? "posts" : "post"}
          </TagTitleDetails>
        </TagTitle>
      </Container>
      <Container>
        <ResponsiveMasonry columnsCountBreakPoints={threeColumnBreakPoints}>
          <Masonry gutter="1rem">
            {edges.map(({ node }) => {
              return (
                <BlogPostCardItem
                  key={node.id}
                  objectID={node.id}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  slug={node.fields.slug}
                  cover={node.frontmatter.cover}
                  description={node.frontmatter.description}
                  tags={node.frontmatter.tags}
                />
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
    </Layout>
  )
}

export default Tag

export const query = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
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
            date
            description
            tags
            comments
          }
        }
      }
    }
  }
`
