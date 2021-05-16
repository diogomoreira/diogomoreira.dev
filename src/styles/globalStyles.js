import styled, { createGlobalStyle, css } from "styled-components"

export const transitionDuration = "200ms"

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

    --font-size-base: 1.25rem;

    --font-size-h1: 2rem;
    --font-size-h2: 1.5rem;
    --font-size-h3: 1.17rem;
    --font-size-h4: 1rem;
    --font-size-h5: .83rem;
    --font-size-h6: .67rem;

    --border-radius: 15px;

    --white: #f3f9fb;
    --black: #141414;

    --white-rbg: 243,249,251;
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
    line-height: 1.8;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    /* font-size: var(--font-size-base); */
  }

  body {
    --bg: var(--white);
    --fg: var(--black);
    --bg-rgb: var(--white-rgb);
    --fg-rgb: var(--black-rgb);

    --textColor: var(--fg);
    --secondaryTextColor: var(--gray-light);

    --linkColor: var(--blue);
    --menuLinkColor: var(--gray);
    --menuTitleColor: var(--gray);
    --borderColor: rgba(var(--gray-light-rgb), 0.25);
    --borderThickness: 2px solid;
    --borderSlice: 1;
    --borderSource: linear-gradient(
      to right,
      rgb(var(--gray-white-rgb)) 30%,
      rgb(var(--gray-lighter-rgb)) 30%
    );


    --detailsColor:  var(--gray-white);
    --shadow: 2px 2px 2px rgba(var(--gray-dark-rgb), 0.2);

    --button-bg: var(--linkColor);
    --button-border: var(--blue-darker);
    --button-textColor: var(--white);

    --inputBg: var(--white);
    --inputFg: var(--gray);

    background-color: var(--bg);
    color: var(--fg);
    transition: ${transitionDuration};
    a {
      color: var(--linkColor);
    }
  }

  body.dark {
    --bg: var(--black);
    --fg: var(--gray-lighter);

    --bg-rgb: var(--black-rgb);
    --fg-rgb: var(--white-rgb);

    --secondaryTextColor: var(--fg);
    --linkColor: var(--orange);
    --menuLinkColor: var(--gray-lighter);
    --menuTitleColor: var(--gray-lighter);
    --borderColor: rgba(var(--gray-light-rgb), 0.4);
    --borderSource: linear-gradient(
      to right,
      rgb(var(--gray-dark-rgb)) 30%,
      rgb(var(--gray-rgb)) 30%
    );
    --detailsColor: var(--gray-darker);
    --shadow: 2px 2px 2px rgba(var(--white-rbg), 0.1);
    --button-bg: var(--linkColor);
    --button-border: var(--orange-darker);
    --button-textColor: var(--gray-darker);
    --inputBg: var(--gray-dark);
    --inputFg: var(--gray-lighter);
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
    /* letter-spacing: 0.41; */
  }
`

export const ButtonStyle = css`
  display: inline-block;
  border: var(--borderThickness);
  border-color: var(--button-border);
  background-color: var(--button-bg);
  color: var(--button-textColor);
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
`

export const StackItems = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const TagStyle = css`
  font-size: calc(var(--font-size-h5) * 0.75);
  padding: 0.25rem 0.75rem;
  /* border-radius: 0.75em 0.75em 0.75em 0.75em; */
  background-color: var(--button-bg);
  color: var(--button-textColor);
  ::before {
    content: "#";
  }
`

export const TitleStyle = css`
  text-transform: uppercase;
  border-bottom: var(--borderThickness);
  border-image-slice: var(--borderSlice);
  border-image-source: var(--borderSource);
  /* padding-bottom: 0.25rem; */
  line-height: 24px;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

export default GlobalStyle
