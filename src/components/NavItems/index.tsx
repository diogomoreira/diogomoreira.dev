import React, { useState } from "react";
import { useSiteMetadata } from "../../hooks/useMetadata";
import { faRssSquare } from "@fortawesome/free-solid-svg-icons/faRssSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import { LocalizedLink as Link } from "gatsby-theme-i18n";
import media from "styled-media-query";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { useTranslation } from "react-i18next";

// Codepen by Gabriel Cojea - https://codepen.io/gabrielcojea/pen/ExPaBzQ
const NavLink = styled(Link)`
  position: relative;
  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: var(--link-color);
    transition: width var(--transition-duration) cubic-bezier(0.25, 1, 0.5, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    :hover::before {
      left: 0;
      right: auto;
      width: 100%;
    }
  }
`;

const NavItems = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  font-size: calc(var(--font-size-h4) * 0.9);

  ${media.lessThan("medium")`
    display: ${props => (props.opened ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    justify-items: stretch;
    flex-direction: column;
    position: fixed;
    background-color: rgba(var(--secondary-color), 0.9);
    color: var(--text-color);
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 2;
    font-size: var(--font-size-h3);
    transition: display var(--transition-duration) ease-in-out;

    > ${NavLink} {
      margin-bottom: 2rem;
    }
  `}
`;

const NavigationItems = ({ toggleMenu }) => {
  const { menu } = useSiteMetadata();
  const { t } = useTranslation();

  return (
    <NavItems opened={toggleMenu}>
      {menu.map((item, i) => (
        <NavLink key={i} to={item.link} partiallyActive={true} activeClassName="active">
          {t(item.name)}
        </NavLink>
      ))}
    </NavItems>
  );
};

export default NavigationItems;
