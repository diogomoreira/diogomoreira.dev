import styled from "styled-components"
import media from "styled-media-query"

export const FooterContainer = styled.footer`
  margin-top: 2rem;
`
export const FooterInfo = styled.div`
  border-top: var(--border-default-width);
  border-image-slice: var(--border-slice);
  border-image-source: var(--border-source);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: smaller;
  padding: 2rem 0;
  color: var(--text-color);

  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`
export const FooterItem = styled.span`
  padding: 0 1rem;
  font-weight: ${props => (props.highlight ? "bold" : "normal")};

  ${media.greaterThan("medium")`
    :not(:last-of-type) {
      border-right: 1px solid var(--border-color);
    }
  `}
`
