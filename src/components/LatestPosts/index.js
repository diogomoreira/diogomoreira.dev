import BlogPostCardItem from "components/BlogPostCardItem"
import BlogPostListItem from "components/BlogPostListItem"
import { PageSection } from "components/Layout"
import React from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { threeColumnBreakPoints } from "utils/masonry/breakpoints"

const LatestPosts = ({ posts }) => {
  return (
    <PageSection className="bg-light py-5">
      <h2>Últimas postagens</h2>
      <ResponsiveMasonry columnsCountBreakPoints={threeColumnBreakPoints}>
        <Masonry gutter="1rem">
          {posts.map(postItem => {
            return (
              <BlogPostCardItem
                key={postItem.id}
                objectID={postItem.id}
                title={postItem.frontmatter.title}
                date={postItem.frontmatter.date}
                slug={postItem.fields.slug}
                cover={postItem.frontmatter.cover}
                description={postItem.frontmatter.description}
              />
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </PageSection>
  )
}

export default LatestPosts
