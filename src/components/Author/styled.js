import styled from "styled-components"
import media from "styled-media-query"

export const AuthorContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
  gap: 5%;
  padding-bottom: 2rem;

  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`

export const AuthorProfileText = styled.div`
  min-width: 70%;
`

export const AuthorTitle = styled.h1`
  font-size: calc(var(--font-size-h1) * 2);

  ${media.lessThan("medium")`
    font-size: var(--font-size-h1);
    text-transform: uppercase;
    text-align: center;
  `}
`

export const AuthorAvatar = styled.div`
  max-width: 25%;
  flex: 1 0 auto;

  div {
    border: 0.5rem solid var(--border-color);
    border-radius: 50%;
    box-shadow: 0px 3px 7px rgba(var(--black-rgb), 0.2);
    img {
      border-radius: 50%;
    }
  }

  ${media.lessThan("medium")`
    max-width: 60%;
    margin-bottom: 2rem;
  `}
`
