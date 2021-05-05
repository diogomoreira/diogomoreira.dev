import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import "./pinitem.scss"

const PinItem = ({
  objectID,
  image,
  title,
  description,
  link,
  publishDate,
  tags,
}) => {
  return (
    <div key={objectID} className="pin-item">
      <div className="card">
        <a href={link} target="_blank">
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt={title}
            className="card-img-top"
          />
        </a>
        <div className="card-body">
          <a
            href={link}
            className="text-decoration-none text-dark"
            target="_blank"
          >
            <h5 className="card-title">{title}</h5>
          </a>
          <h6 className="card-subtitle mb-2 text-black-50 fw-light">
            <time>{publishDate}</time>
          </h6>
          <hr />
          <div
            className="card-text text-black-50"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="pin-item-tags card-footer card-text">
          {tags.map(tag => (
            <span className="me-2 text-decoration-none text-black-50">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PinItem
