import React from "react"

const BlogPostContent = ({ html }) => {
  return <article dangerouslySetInnerHTML={{ __html: html }} />
}

export default BlogPostContent
