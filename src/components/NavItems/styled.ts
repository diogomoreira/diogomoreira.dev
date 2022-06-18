import styled from "styled-components"
import { Link } from "gatsby"
import media from "styled-media-query"

// Codepen by Gabriel Cojea - https://codepen.io/gabrielcojea/pen/ExPaBzQ
export const NavLink = styled(Link)`
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
`

export const NavItems = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  ${media.lessThan("medium")`
    display: ${props => (props.opened ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    justify-items: stretch;
    flex-direction: column;
    position: fixed;
    background-color: rgba(var(--background-color-rgb), 0.9);
    color: var(--text-color);
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 2;
    font-size: var(--font-size-h2);
    transition: display var(--transition-duration) ease-in-out;

    > ${NavLink} {
      margin-bottom: 2rem;
    }
  `}
`
