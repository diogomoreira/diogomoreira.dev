import styled from "styled-components"
import { transitionDuration } from "styles/globalStyles"

export const Content = styled.article`
  font-size: var(--font-size-base);
  margin-block-start: 1.75em;
  margin-block-end: 1.75em;
  p {
    color: var(--fg);
    letter-spacing: 0.025em;
    line-height: 37px;

    a:hover {
      text-decoration: underline;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`
