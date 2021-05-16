import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import media from "styled-media-query"

export const NavTogglerContainer = styled.div`
  display: none;
  ${media.lessThan("medium")`
    width: 2rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--borderThickness);
    border-color: var(--borderColor);
    background-color: var(--bg);
    cursor: pointer;
    z-index: ${props => (props.opened ? "3" : "1")};
  `};
`

export const NavToggler = styled(FontAwesomeIcon)`
  margin: 0 auto;
`
