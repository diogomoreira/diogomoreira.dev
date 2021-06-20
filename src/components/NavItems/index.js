import React, { useState } from "react"
import { useSiteMetadata } from "hooks/useMetadata"
import * as S from "./styled"
import { faRssSquare } from "@fortawesome/free-solid-svg-icons/faRssSquare"
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
      <S.NavLink to="/cv.pdf">CV</S.NavLink>
      <S.NavLink to="/rss.xml">
        <FontAwesomeIcon icon={faRssSquare} />
      </S.NavLink>
    </S.NavItems>
  )
}

export default NavItems
