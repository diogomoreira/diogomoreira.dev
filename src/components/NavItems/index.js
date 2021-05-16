import React, { useState } from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "hooks/useMetadata"
import * as S from "./styled"
import { faRssSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavItems = ({ toggleMenu }) => {
  const { menu } = useSiteMetadata()

  return (
    <S.NavItems opened={toggleMenu}>
      {menu.map((item, i) => (
        <S.NavLink
          key={i}
          to={item.link}
          partiallyActive={true}
          activeClassName="active"
        >
          {item.name}
        </S.NavLink>
      ))}
      <Link to="/rss.xml">
        <FontAwesomeIcon icon={faRssSquare} />
      </Link>
    </S.NavItems>
  )
}

export default NavItems
