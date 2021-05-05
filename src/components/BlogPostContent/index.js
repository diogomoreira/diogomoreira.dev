import React from "react"
import "./blog-post-content.scss"

const BlogPostContent = ({ html }) => {
  return (
    <article>
      <div
        className="blog-post-content mt-5 lh-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}

export default BlogPostContent
