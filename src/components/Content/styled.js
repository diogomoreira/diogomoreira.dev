import styled from "styled-components"

export const Content = styled.article`
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
