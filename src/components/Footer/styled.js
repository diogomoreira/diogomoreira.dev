import styled from "styled-components"

export const FooterContainer = styled.footer`
  margin-top: 2rem;
`
export const FooterInfo = styled.div`
  border-top: 1px solid var(--borderColor);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: smaller;
  padding: 2rem 0;
  color: var(--fg);
`
export const FooterItem = styled.span`
  padding: 0 1rem;
  font-weight: ${props => (props.highlight ? "bold" : "normal")};

  :not(:last-of-type) {
    border-right: 1px solid var(--borderColor);
  }
`
