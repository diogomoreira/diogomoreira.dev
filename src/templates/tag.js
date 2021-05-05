import React from "react"
import { graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import { Layout } from "components/Layout"
import { PageSection } from "components/Layout"
import SEO from "components/SEO"
import BlogPostCardItem from "components/BlogPostCardItem"
import { threeColumnBreakPoints } from "utils/masonry/breakpoints"

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <>
      <Layout>
        <SEO
          title={tag}
          description={`${totalCount} posts marcados com #${tag}`}
          pathname={`tags/${kebabCase(tag)}`}
        />
        <PageSection>
          <h1 className="page-title">Tags</h1>
          <h4 className="mb-5">
            <span class="text-muted">#</span>
            {tag}
          </h4>
        </PageSection>
        <PageSection className="bg-light py-5">
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
                  />
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        </PageSection>
      </Layout>
    </>
  )
}

export default Tag

export const query = graphql`
  query($tag: String) {
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
            date(formatString: "LL", locale: "pt-br")
            description
            tags
            comments
          }
        }
      }
    }
  }
`
