import Content from "components/Content"
import { motion } from "framer-motion"
import styled from "styled-components"
import media from "styled-media-query"

export const AuthorContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  justify-items: center;
  gap: 5%;

  ${media.lessThan("medium")`
    flex-direction: column;
    align-items: center;
  `}
`

export const AuthorProfileText = styled.div`
  p:first-child {
    margin-bottom: 0;
    ${media.lessThan("medium")`
        text-align: center;
    `}
  }

  min-width: 70%;
  ${Content} {
    margin-top: 0;
  }
`

export const AuthorTitle = styled.h1`
  ${media.greaterThan("medium")`
    font-size: calc(var(--font-size-h1) * 2) !important;
    margin: 0px !important;
  `}

  ${media.lessThan("medium")`
    font-size: var(--font-size-h1);
    text-transform: uppercase;
    text-align: center;
    margin: 0px !important;
  `}
`

export const AuthorHeadline = styled.p`
  font-size: var(--font-size-h1);
  ${media.lessThan("medium")`
    font-size: var(--font-size-h2);
    text-align: center;
  `}
  color: var(--link-color) !important;
  font-weight: var(--font-weight-bold);
`

export const AuthorAvatar = styled(motion.div).attrs({
  variants: {
    enter: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.5,
      opacity: 0,
    },
  },
})`
  max-width: 25%;
  position: relative;
  flex: 1 0 auto;

  ${media.lessThan("medium")`
    max-width: 60%;
    margin-bottom: 2rem;
  `}

  .gatsby-image-wrapper {
    /* border: calc(var(--border-default-width)); */
    border: 5px solid;
    border-color: var(--border-color);
    box-shadow: var(--shadow);
  }
`
