import React from "react"

import { BgImage } from "gbimage-bridge"

import "./header.scss"
import kebabCase from "lodash/kebabCase"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import { GatsbyImage } from "gatsby-plugin-image"

const Header = ({ title, description, date, cover, timeToRead, tags }) => {
  return (
    <div className="jumbotron">
      <GatsbyImage
        image={cover.childImageSharp.gatsbyImageData}
        className="mb-4 bg-image d-block"
        imgClassName="img-fluid"
        alt={title}
      />
      <div className="container px-4 px-lg-5 mt-0">
        <div className="mb-4">
          <Link className="text-muted text-decoration-none" to="/blog">
            ← Voltar para a listagem
          </Link>
        </div>
        <div className="post-details">
          <time>{date}</time> · Leitura de <span className="oi oi-clock"></span>{" "}
          {timeToRead} {timeToRead > 1 ? `minutos` : `minuto`}
        </div>
        <h1 className="jumbotron-title pb-2 mb-0">{title}</h1>
        <div className="lead pb-4">{description}</div>
        <div className="tags">
          <FontAwesomeIcon icon={faTags} />{" "}
          {tags.map(tag => (
            <Link to={`/tags/${kebabCase(tag)}`}>
              <span className="badge bg-dark me-2">#{tag}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
