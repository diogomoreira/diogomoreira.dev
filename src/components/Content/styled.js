import styled from "styled-components"
import { motion } from "framer-motion"

export const Content = styled(motion.article).attrs({
  // initial: { opacity: 0, y: 25 },
  // animate: { opacity: 1, y: 0 },
  // exit: { opacity: 0, x: 25 },
  // transition: {
  //   type: "tween",
  //   mass: 0.35,
  //   stiffness: 75,
  //   duration: 0.75,
  // },
})`
  font-size: var(--font-size-base);
  margin-block-start: 1.75em;
  margin-block-end: 1.75em;
  p {
    color: var(--text-color);
    letter-spacing: 0.025em;
    line-height: 37px;

    a:hover {
      text-decoration: underline;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    em {
      font-style: italic;
    }
  }

  ul,
  ol {
    list-style: square;
    list-style-position: inside;
    margin: 2rem auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2rem auto;
  }
`
