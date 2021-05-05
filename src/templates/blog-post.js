import React from "react"

import { graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"

import { Layout } from "components/Layout"
import Header from "components/Header"
import SEO from "components/SEO"
import BlogPostContent from "components/BlogPostContent"

const BlogPostLayout = ({ data }) => {
  const { frontmatter, html, excerpt, timeToRead } = data.markdownRemark
  const { title, date, description, cover, tags, comments } = frontmatter
  const path = data.markdownRemark.fields.slug

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_SHORTNAME,
    config: { identifier: path, title },
  }
  return (
    <Layout>
      <SEO
        title={title}
        description={description || excerpt}
        image={cover?.childImageSharp?.resize}
        pathname={path}
      />
      <div>
        <Header
          title={title}
          description={description}
          date={date}
          cover={cover}
          timeToRead={timeToRead}
          tags={tags}
        />
        <div className="container px-4 px-lg-5 main-container">
          <div className="row">
            <div className="col-12">
              <BlogPostContent html={html} />
              {comments && <DiscussionEmbed {...disqusConfig} />}
            </div>
          </div>
        </div>
      </div>
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
