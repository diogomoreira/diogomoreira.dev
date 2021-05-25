import { motion } from "framer-motion"
import styled, { keyframes } from "styled-components"
import { ButtonStyle, transitionDuration } from "styles/globalStyles"

export const ResearchItemDetail = styled(motion.details).attrs({
  variants: {
    enter: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 5,
      opacity: 0,
    },
  },
})`
  margin-bottom: 1rem;
  border: var(--border-default-width);
  border-color: var(--border-color);
  box-shadow: var(--shadow);
`

export const ResearchItemSummary = styled.summary`
  background-color: var(--details-color);
  padding: 0.75rem 1rem;
  ::marker {
    content: "📄";
  }
  span {
    margin-left: 1rem;
    font-weight: var(--font-weight-normal);
  }
`

export const ResearchItemContent = styled(motion.div)`
  padding: 1rem;
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-light);
  text-align: justify;
`

export const ResearchItemAuthors = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid var(--border-color);
  padding-top: 0.5rem;
`

export const ResearchItemAuthor = styled.span`
  font-weight: var(--font-weight-bold);
  :not(:last-child) {
    ::after {
      content: ", ";
    }
  }
`

export const ResearchItemFooter = styled.footer`
  background-color: var(--details-color);
  padding: 1rem;
`

export const ResearchItemBibTex = styled.pre`
  display: none;
`

export const ResearchItemCopyTooltip = styled.span`
  display: none;
`

export const ResearchItemButton = styled.button.attrs({ type: "button" })`
  ${ButtonStyle}
  cursor: pointer;
`
