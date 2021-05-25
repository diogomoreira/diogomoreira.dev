import styled from "styled-components"
import Container from "components/Container"

export const NavContainer = styled.header`
  padding-top: 1rem;
  background-color: var(--menu-background);

  a {
    text-decoration: none;
  }
`

export const NavInnerContainer = styled(Container)``

export const SiteTitle = styled.div`
  display: flex;
  align-items: center;

  h1 {
    color: var(--menu-title-color);
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: -0.075em;
    font-weight: 700;
    font-size: 0.85rem;
    margin-left: 1rem;
  }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 0.85rem;
  font-weight: var(--font-weight-title);
  -moz-osx-font-smoothing: grayscale;

  a {
    color: var(--menu-link-color);
  }
`

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-default-width);
  border-image-slice: var(--border-slice);
  border-image-source: var(--border-source);
  padding-bottom: 1rem;
`
