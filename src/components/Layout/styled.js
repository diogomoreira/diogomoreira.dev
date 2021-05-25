import { motion } from "framer-motion"
import styled, { css } from "styled-components"

export const BodyContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

export const SiteContent = styled(motion.div).attrs({
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        // when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
    exit: { y: 5, opacity: 0 },
  },
})`
  margin-top: 2rem;
  flex: 1;
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom};
    `}
`
