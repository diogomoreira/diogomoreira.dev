import styled, { css } from "styled-components";

const HRTitles = css`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  ::after {
    content: "";
    display: block;
    position: relative;
    top: 5px;
    width: 100%;
    height: 1px;
    margin-left: 20px;
    background-color: var(--secondary-color);
  }
`;

export const PageTitle = styled.h1`
  ${HRTitles}
`;

export const SectionTitle = styled.h2`
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
  color: var(--link-color);
  /* text-align: center; */
`;

export const Titles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-title);
    font-weight: var(--font-weight-title);
    line-height: normal;
  }

  h1 {
    font-size: var(--font-size-h1);
    letter-spacing: 0.41;
  }

  h2 {
    font-size: var(--font-size-h2);
    letter-spacing: 0.41;
  }
  h3 {
    font-size: var(--font-size-h3);
    letter-spacing: 0.34;
  }
  h4 {
    font-size: var(--font-size-h4);
    letter-spacing: 0.35;
  }
  h5 {
    font-size: var(--font-size-h5);
    letter-spacing: 0.38;
  }
  h6 {
    font-size: var(--font-size-h6);
  }
`;
