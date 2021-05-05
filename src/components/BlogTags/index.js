import { Link } from "gatsby"
import React from "react"
import kebabCase from "lodash/kebabCase"

const BlogTags = ({ tags }) => {
  return (
    <div className="pb-5 d-none d-sm-block">
      {tags.map(tag => (
        <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
          <button type="button" class="btn btn-dark me-2">
            {tag.fieldValue}{" "}
            <span class="badge bg-secondary">{tag.totalCount}</span>
          </button>
        </Link>
      ))}
    </div>
  )
}

export default BlogTags
