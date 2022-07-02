import React, { useState } from "react";
import { LocalizedLink as Link } from "gatsby-theme-i18n";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import NavItems from "../NavItems";
import ModeToggler from "../ModeToggler";
import NavToggler from "../NavToggler";
import useToggle from "../../hooks/useToggle";
import styled from "styled-components";
import Container from "../Container";

export const NavContainer = styled.header`
  padding-top: 1rem;
  background-color: var(--black);

  a {
    text-decoration: none;
  }
`;

export const NavInnerContainer = styled(Container)``;

export const SiteTitle = styled.div`
  display: flex;
  align-items: center;

  h1 {
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 700;
    font-size: var(--font-size-h4);
    margin: 0;
    margin-left: 1rem;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;

  a {
    color: var(--menu-text-color);
  }
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-width) var(--border-style) var(--menu-border);
  padding-bottom: 1rem;
`;

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useToggle(false);

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
  `);

  const {
    siteMetadata,
    siteMetadata: { menu },
  } = site;
  return (
    <NavContainer>
      <NavInnerContainer>
        <NavContent>
          <Link to="/">
            <SiteTitle>
              <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={siteMetadata.title} />
              <h1>{siteMetadata.title}</h1>
            </SiteTitle>
          </Link>
          <NavMenu>
            <NavItems toggleMenu={toggleMenu} />
            <ModeToggler />
            <NavToggler toggleMenu={toggleMenu} toggleFunction={setToggleMenu} />
          </NavMenu>
        </NavContent>
      </NavInnerContainer>
    </NavContainer>
  );
}
