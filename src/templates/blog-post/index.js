import React from "react"

import { graphql } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"
import { Layout } from "components/Layout"
import Header from "components/Header"
import SEO from "components/SEO"
import BlogPostContent from "components/BlogPostContent"
import Container from "components/Container"
import Content from "components/Content"
import { useSiteMetadata } from "hooks/useMetadata"

const BlogPostLayout = ({ data }) => {
  const { frontmatter, html, excerpt, timeToRead } = data.markdownRemark
  const { title, date, description, cover, tags, comments } = frontmatter
  const path = useSiteMetadata().siteUrl + data.markdownRemark.fields.slug
  const postId = data.markdownRemark.id

  const disqusConfig = {
    url: path,
    identifier: postId,
    title: title,
  }
  return (
    <Layout marginTop="0">
      <SEO
        title={title}
        description={description || excerpt}
        image={cover?.childImageSharp?.resize}
        pathname={path}
      />
      <Header
        title={title}
        description={description}
        date={date}
        cover={cover}
        timeToRead={timeToRead}
        tags={tags}
      />
      <Container>
        <Content>
          <BlogPostContent html={html} />
          {comments && <Disqus {...disqusConfig} />}
        </Content>
      </Container>
    </Layout>
  )
}

export default BlogPostLayout

export const pageQuery = graphql`
  query PostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
      html
      excerpt
      timeToRead
    }
  }
`
