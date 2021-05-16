import { Link } from "gatsby"
import React from "react"
// import "./blog-post-listitem.scss"

const BlogPostListItem = ({ id, frontmatter, fields }) => {
  return (
    <li key={id} className="list-group-item blog-post-list-item fs-6 fw-bolder">
      <Link
        to={`${fields.slug}`}
        className="text-decoration-none stretched-link"
      >
        {frontmatter.title} -{" "}
        <time className="fw-normal">{frontmatter.date}</time>
      </Link>
    </li>
  )
}

export default BlogPostListItem
