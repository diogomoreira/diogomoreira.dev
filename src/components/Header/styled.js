import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import media from "styled-media-query"
import { TagStyle } from "styles/globalStyles"

export const HeaderImage = styled(GatsbyImage)`
  width: 100%;
  max-height: 300px;

  ${media.lessThan("large")`
    max-height: 200px;
  `}
`

export const HeaderInfo = styled.p`
  font-weight: var(--font-weight-lighter);
  font-size: var(--font-size-h4);
  margin: 1rem auto;
  ${media.lessThan("large")`
    font-size: var(--font-size-h4);
  `}
`

export const HeaderTitle = styled.h1`
  font-size: calc(var(--font-size-h1) * 2);
  font-weight: var(--font-weight-title);
  color: var(--fg);
  margin: 1.5rem auto;
  ${media.lessThan("large")`
    font-size: calc(var(--font-size-h1) * 1.5);
  `}
`

export const HeaderLead = styled.h2`
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-light);
  color: var(--fg);
  ${media.lessThan("large")`
    font-size: var(--font-size-h3);
  `}
`

export const HeaderTags = styled.div`
  font-size: var(--font-size-h4);
  margin: 0.5rem auto;
  padding: 1rem 0;
  border-top: var(--borderThickness);
  border-top-color: var(--borderColor);
  border-bottom: var(--borderThickness);
  border-bottom-color: var(--borderColor);
  margin: 2rem 0;
`

export const HeaderTagLink = styled(Link)`
  ${TagStyle}
`
