import React from "react"
import { graphql } from "gatsby"
import { InstantSearch } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import Layout from "components/Layout"
import SEO from "components/SEO"
import InstantSearchBox from "components/InstantSearchBox"
import BlogTags from "components/BlogTags"
import BlogHits from "components/BlogHits"
import Container from "components/Container"

const Blog = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_API_KEY
  )
  const indexName = process.env.GATSBY_ALGOLIA_BLOG_INDEX_NAME

  return (
    <Layout>
      <SEO title="Blog" pathname="blog" />
      <Container>
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <h1>Blog</h1>
          <InstantSearchBox />
          <BlogTags tags={group} />
          <BlogHits />
        </InstantSearch>
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
