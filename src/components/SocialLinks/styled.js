import styled from "styled-components"
import media from "styled-media-query"

export const SocialLinksContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  max-width: 30%;
  ${media.lessThan("medium")`
    max-width: 75%;
    margin: 1rem auto;
  `}
  justify-content: space-between;
`

export const SocialLink = styled.a.attrs({ target: "_blank" })`
  font-size: 2rem;
`
