import styled, { createGlobalStyle, css } from "styled-components";

export const transitionDuration = "200ms";

const GlobalStyle = createGlobalStyle`

  :root {
    --viewport-sm-max: 450px;
    --viewport-md-max: 768px;
    --viewport-lg-max: 1170px;

    --font-weight-lighter: 100;
    --font-weight-light: 200;
    --font-weight-normal: 400;
    --font-weight-bold: 600;
    --font-weight-extra-bold: 900;
    --font-weight-title: 700;

    --font-size-base: 1.125rem;

    --font-size-h1: calc(var(--font-size-base) + 0.75rem);
    --font-size-h2: calc(var(--font-size-base) + 0.25rem);
    --font-size-h3: calc(var(--font-size-base) - 0.08rem);
    --font-size-h4: calc(var(--font-size-base) - 0.25rem);
    --font-size-h5: calc(var(--font-size-base) - 0.42rem);
    --font-size-h6: calc(var(--font-size-base) - 0.58rem);

    --border-radius: 10px;
    --transition-duration: 250ms;

    --white: #f3f9fb;
    --black: #141414;

    --white-rgb: 243, 249, 251;
    --black-rgb: 20, 20, 20;

    --gray-white: #eeeeee;
    --gray-lighter: #d1d1d1;
    --gray-light: #777;
    --gray: #555;
    --gray-dark: #333;
    --gray-darker: #222;
    --gray-black: #141414;

    --gray-white-rgb: 209, 209, 209;
    --gray-lighter-rgb: 238, 238, 238;
    --gray-light-rgb: 119, 119, 119;
    --gray-rgb: 85, 85, 85;
    --gray-dark-rgb: 51, 51, 51;
    --gray-darker-rgb: 34, 34, 34;
    --gray-black-rgb: 20, 20, 20;

    --blue: #345995;
    --blue-darker: #27426f;
    --orange: #FF8811;
    --orange-darker: #dd6f00;
    --green: #1de9b6;
    --green-darker: #00b686;
  }

  * {
    /* transition: var(--transition-duration); */
  }

  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-base);
    line-height: 1.8;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    font-size: var(--font-size-base);
  }

  body {
    --background-color: var(--white);
    --background-color-rgb: var(--white-rgb);

    --secondary-background: var(--gray-lighter);
    --menu-background: var(--gray-white);

    --text-color: var(--black);
    --text-color-rgb: var(--black-rgb);
    --secondary-text-color: var(--gray-light);

    --link-color: var(--blue);
    --menu-link-color: var(--gray);
    --menu-title-color: var(--gray);
    --border-color: rgba(var(--gray-light-rgb), 0.25);
    --border-default-width: 2px solid;
    --border-slice: 1;
    --border-source: linear-gradient(
      to right,
      rgb(var(--gray-white-rgb)) 30%,
      rgb(var(--gray-lighter-rgb)) 30%
    );

    --details-color:  var(--gray-white);
    --shadow: 3px 3px 0px rgba(var(--gray-dark-rgb), 0.2);

    --button-bg: var(--link-color);
    --button-border: var(--blue-darker);
    --button-text-color: var(--white);

    --input-background-color: var(--white);
    --input-text-color: var(--gray);

    background-color: var(--background-color);
    color: var(--text-color);
    a {
      color: var(--link-color);
    }
  }

  body.dark {
    --background-color: var(--black);
    --text-color: var(--gray-lighter);

    --background-color-rgb: var(--black-rgb);
    --text-color-rgb: var(--white-rgb);

    --secondary-background: var(--gray-dark);
    --menu-background: var(--gray-darker);

    --secondary-text-color: var(--gray-white);
    --link-color: var(--green-darker);
    --menu-link-color: var(--gray-lighter);
    --menu-title-color: var(--gray-lighter);
    --border-color: rgba(var(--gray-light-rgb), 0.4);
    --border-source: linear-gradient(
      to right,
      rgb(var(--gray-dark-rgb)) 30%,
      rgb(var(--gray-rgb)) 30%
    );
    --details-color: var(--gray-darker);
    --shadow: 2px 2px 2px rgba(var(--white-rgb), 0.1);
    --button-bg: var(--link-color);
    --button-border: var(--green-darker);
    --button-text-color: var(--gray-darker);
    --input-background-color: var(--gray-dark);
    --input-text-color: var(--gray-lighter);
  }

  a {
    text-decoration: none;
  }

  b, strong {
    font-weight: var(--font-weight-bold);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--font-weight-title);
    line-height: normal;
    margin-top: 1rem;
    margin-bottom: 1rem;
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

export const ButtonStyle = css`
  display: inline-block;
  border: var(--border-default-width);
  border-color: var(--button-border);
  background-color: var(--button-bg);
  color: var(--button-text-color);
  box-shadow: var(--shadow);
  /* border-radius: 0.75em 0.75em 0.75em 0.75em; */
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: var(--font-size-h5);

  svg {
    margin-right: 0.5rem;
  }

  :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const StackItems = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;
    :last-child {
      margin-right: 0;
    }
  }
`;

export const TagStyle = css`
  font-size: calc(var(--font-size-h5));
  padding: 0.25rem 0.75rem;
  /* border-radius: 0.75em 0.75em 0.75em 0.75em; */
  background-color: var(--button-bg);
  color: var(--button-text-color);
  ::before {
    content: "#";
  }
`;

export const TitleStyle = css`
  text-transform: uppercase;
  border-bottom: var(--border-default-width);
  border-image-slice: var(--border-slice);
  border-image-source: var(--border-source);
  /* padding-bottom: 0.25rem; */
  line-height: 24px;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const PageTitle = styled.h1`
  display: flex;
  align-items: center;

  ::after {
    content: "";
    display: block;
    position: relative;
    top: 5px;
    width: 100%;
    height: 1px;
    margin-left: 20px;
    background-color: var(--secondary-background);
  }
`;

export default GlobalStyle;
