import { motion } from "framer-motion"
import { Link } from "gatsby"
import styled from "styled-components"
import { TagStyle } from "styles/globalStyles"

export const CardImage = styled.div`
  flex: 1;
`

export const Card = styled(motion.div).attrs({
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
  border: var(--border-default-width) var(--border-color);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
`

export const CardInfo = styled.div`
  flex: 1;
`

export const CardBody = styled.div`
  padding: 0.5rem 1rem 1.25rem 1rem;
  font-size: var(--font-size-h4);

  p {
    color: var(--secondary-text-color);
    margin-bottom: 1rem;
  }
`

export const CardDetails = styled.div`
  display: flex;
  font-size: var(--font-size-h4);
  color: var(--gray);
`

export const CardLinkHashTag = styled(Link)`
  ${TagStyle}
`

export const CardHashTag = styled.span`
  ${TagStyle}
`

export const CardTimeToRead = styled.span`
  color: var(--input-text-color);

  :not(:last-child) {
    ::after {
      padding: 0 0.25rem;
      content: "·";
    }
  }
`

export const CardDate = styled.span`
  color: var(--input-text-color);
  :not(:last-child) {
    ::after {
      padding: 0 0.25rem;
      content: "·";
    }
  }
`

export const CardTitle = styled.h3`
  color: var(--input-text-color);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-h2);
  padding-bottom: 1rem;
  border-bottom: var(--border-default-width) var(--border-color);
  margin-bottom: 1rem;
`

export const CardFooter = styled.div`
  padding: 1rem 1rem;
  background-color: var(--details-color);
  color: var(--secondary-text-color);
  font-size: 0.9rem;
`
