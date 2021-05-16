import { Link } from "gatsby"
import styled from "styled-components"
import { TagStyle } from "styles/globalStyles"

export const CardImage = styled.div`
  flex: 1;
`

export const Card = styled.div`
  border: var(--borderThickness) var(--borderColor);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
`

export const CardInfo = styled.div`
  flex: 1;
`

export const CardBody = styled.div`
  padding: 0.5rem 1rem 1.25rem 1rem;
  font-size: 0.9rem;

  p {
    color: var(--secondaryTextColor);
  }
`

export const CardDetails = styled.div`
  display: flex;
  font-size: 0.75rem;
  color: var(--gray-light);
`

export const CardLinkHashTag = styled(Link)`
  ${TagStyle}
`

export const CardHashTag = styled.span`
  ${TagStyle}
`

export const CardTimeToRead = styled.span`
  color: var(--detailsTextColor);

  :not(:last-child) {
    ::after {
      padding: 0 0.25rem;
      content: "·";
    }
  }
`

export const CardDate = styled.span`
  color: var(--detailsTextColor);
  :not(:last-child) {
    ::after {
      padding: 0 0.25rem;
      content: "·";
    }
  }
`

export const CardTitle = styled.h3`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--fg);
  font-weight: var(--font-weight-title);
  font-size: var(--font-size-h2);
`

export const CardFooter = styled.div`
  padding: 1rem 1rem;
  background-color: var(--detailsColor);
  color: var(--secondaryTextColor);
  font-size: 0.9rem;
`
