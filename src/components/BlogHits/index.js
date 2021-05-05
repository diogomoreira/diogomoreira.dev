import BlogPostCardItem from "components/BlogPostCardItem"
import React from "react"
import { connectHits } from "react-instantsearch-dom"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { threeColumnBreakPoints } from "utils/masonry/breakpoints"

const BlogHits = ({ hits }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={threeColumnBreakPoints}>
      <Masonry gutter="1rem">
        {hits.map(hit => (
          <BlogPostCardItem key={hit.objectID} {...hit} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default connectHits(BlogHits)
