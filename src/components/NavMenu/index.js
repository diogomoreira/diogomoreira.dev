import React from "react"

import { Link, graphql, useStaticQuery } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRssSquare } from "@fortawesome/free-solid-svg-icons"

import NavItem from "components/NavItem"

import "./navmenu.scss"

export default function Navigation() {
  const { site, image } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          menu {
            name
            link
          }
        }
      }
      image: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(formats: PNG, width: 40)
        }
      }
    }
  `)

  const {
    siteMetadata,
    siteMetadata: { menu },
  } = site
  return (
    <nav className="navbar navbar-container navbar-expand-md navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            height={50}
            width={50}
            alt={siteMetadata.title}
          />
        </Link>
        <span className="navbar-text title">
          <Link to="/">{siteMetadata.title}</Link>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-content"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse flex-row-reverse"
          id="navbar-content"
        >
          <ul className="navbar-nav main-navbar">
            {menu.map((item, i) => (
              <NavItem key={i} {...item} />
            ))}
            <li className="nav-item rss-item d-none d-sm-block">
              <Link to="/rss.xml" className="nav-link">
                <FontAwesomeIcon icon={faRssSquare} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
