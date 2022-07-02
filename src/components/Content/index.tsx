import styled from "styled-components";

const Content = styled.article`
  font-size: var(--font-size-base);
  margin-block-start: 1.75em;
  margin-block-end: 1.75em;
  & p {
    color: var(--text-color);
    line-height: 1.8;
    a:hover {
      text-decoration: underline;
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    em {
      font-style: italic;
    }
  }
  & img {
    margin-bottom: 36px;
  }
  & ul,
  & ol {
    list-style: square;
    list-style-position: inside;
    margin-top: 20px auto;
  }
  & h1 {
    font-size: var(--font-size-h1);
    letter-spacing: 0.41;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  & h2 {
    font-size: var(--font-size-h2);
    margin-top: 2rem;
    margin-bottom: 2rem;
    letter-spacing: 0.41;
  }
  & h3 {
    font-size: var(--font-size-h3);
    letter-spacing: 0.34;
  }
  & h4 {
    font-size: var(--font-size-h4);
    letter-spacing: 0.35;
  }
  & h5 {
    font-size: var(--font-size-h5);
    letter-spacing: 0.38;
  }
  & h6 {
    font-size: var(--font-size-h6);
  }
`;

export default Content;
