import styled from "styled-components"
import media from "styled-media-query"

export const SocialLinksContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  max-width: 80%;
  ${media.lessThan("medium")`
    max-width: 100%;
    margin: 1rem auto;
    flex-direction: column;
  `}
`

export const SocialLink = styled.a.attrs({ target: "_blank", rel: "nofollow" })`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2rem;
  margin-bottom: 0.75rem;
  border: var(--border-default-width);
  span {
    margin-left: 0.75rem;
  }
`
