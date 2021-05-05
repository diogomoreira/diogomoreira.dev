import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

import "./blog-post-card-item.scss"

const BlogPostCardItem = ({
  objectID,
  description,
  title,
  cover,
  date,
  tags,
  slug,
}) => {
  return (
    <div key={objectID} className="blog-post-item">
      <div className="card">
        <Link to={`/${slug}`}>
          <GatsbyImage
            image={cover.childImageSharp.gatsbyImageData}
            alt={title}
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <Link to={`/${slug}`} className="text-decoration-none text-dark">
            <h4 className="card-title">{title}</h4>
          </Link>
          <h6 className="card-subtitle mb-2 text-black-50 fw-light">
            <time>{date}</time>
          </h6>
          <hr />
          <p className="card-text text-black-50">{description}</p>
        </div>
        <div className="blog-post-item-tags card-footer card-text d-flex">
          {tags &&
            tags.map((tag, i) => (
              <Link
                key={i}
                to={`/tags/${kebabCase(tag)}`}
                className="me-2 text-decoration-none text-black-50"
              >
                #{tag}
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPostCardItem
