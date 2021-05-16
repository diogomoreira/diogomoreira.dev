import styled from "styled-components"
import { Link } from "gatsby"
import { transitionDuration } from "styles/globalStyles"
import media from "styled-media-query"

export const NavItems = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  ${media.lessThan("medium")`
    display: ${props => (props.opened ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    justify-items: stretch;
    position: fixed;
    background-color: rgba(255,255,255, 0.9);
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    z-index: 2;
    font-size: var(--font-size-h3);
    transition: display ${transitionDuration} ease-in-out;
  `}
`

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
    background-color: var(--fg);
    transition: width ${transitionDuration} cubic-bezier(0.25, 1, 0.5, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    :hover::before {
      left: 0;
      right: auto;
      width: 100%;
    }
  }
`
