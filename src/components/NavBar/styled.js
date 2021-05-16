import styled from "styled-components"
import Container from "components/Container"

export const NavContainer = styled.header`
  padding-top: 1rem;

  a {
    text-decoration: none;
  }
`

export const NavInnerContainer = styled(Container)``

export const SiteTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h1 {
    color: var(--menuTitleColor);
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: -0.075em;
    font-weight: 700;
    font-size: 0.85rem;
  }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  -moz-osx-font-smoothing: grayscale;

  a {
    color: var(--menuLinkColor);
  }
`

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--borderThickness);
  border-image-slice: var(--borderSlice);
  border-image-source: var(--borderSource);
  padding-bottom: 1rem;
`
