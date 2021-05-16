import BlogPostCardItem from "components/BlogPostCardItem"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import {
  threeColumnBreakPoints,
  twoColumnBreakPoints,
} from "utils/masonry/breakpoints"
import { LatestPostsContainer, LatestPostTitle } from "./styled"

const LatestPosts = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        limit: 2
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
          timeToRead
        }
      }
    }
  `)

  return (
    <LatestPostsContainer>
      <LatestPostTitle>
        <span>Últimas postagens</span>
      </LatestPostTitle>
      <ResponsiveMasonry columnsCountBreakPoints={threeColumnBreakPoints}>
        <Masonry gutter="1rem">
          {allMarkdownRemark.nodes.map(postItem => {
            return (
              <BlogPostCardItem
                key={postItem.id}
                objectID={postItem.id}
                title={postItem.frontmatter.title}
                date={postItem.frontmatter.date}
                slug={postItem.fields.slug}
                tags={postItem.frontmatter.tags}
                cover={postItem.frontmatter.cover}
                timeToRead={postItem.timeToRead}
                description={postItem.frontmatter.description}
              />
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </LatestPostsContainer>
  )
}

export default LatestPosts
