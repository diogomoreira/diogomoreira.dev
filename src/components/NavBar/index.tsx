import React, { useState } from "react"

import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import {
  NavContainer,
  NavContent,
  NavInnerContainer,
  NavMenu,
  SiteTitle,
} from "./styled"
import NavItems from "components/NavItems"
import ModeToggler from "components/ModeToggler"
import NavToggler from "components/NavToggler"
import useToggle from "hooks/useToggle"

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useToggle(false)

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
    <NavContainer>
      <NavInnerContainer>
        <NavContent>
          <Link to="/">
            <SiteTitle>
              <GatsbyImage
                image={image.childImageSharp.gatsbyImageData}
                height={50}
                width={50}
                alt={siteMetadata.title}
              />
              <h1>{siteMetadata.title}</h1>
            </SiteTitle>
          </Link>
          <NavMenu>
            <NavItems toggleMenu={toggleMenu} />
            <ModeToggler />
            <NavToggler
              toggleMenu={toggleMenu}
              toggleFunction={setToggleMenu}
            />
          </NavMenu>
        </NavContent>
      </NavInnerContainer>
    </NavContainer>
  )
}
