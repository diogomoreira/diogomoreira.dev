import { faBars, faWindowClose } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import * as S from "./styled"

const NavToggler = ({ toggleMenu, toggleFunction }) => {
  return (
    <S.NavTogglerContainer opened={toggleMenu} onClick={e => toggleFunction()}>
      {toggleMenu ? (
        <S.NavToggler icon={faWindowClose} />
      ) : (
        <S.NavToggler icon={faBars} />
      )}
    </S.NavTogglerContainer>
  )
}

export default NavToggler
