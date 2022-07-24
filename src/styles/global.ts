import styled, { createGlobalStyle, css } from "styled-components";
import { Titles } from "./typography";
import { StackItems } from "./utils";

const GlobalStyle = createGlobalStyle`

  :root {
    --viewport-sm-max: 450px;
    --viewport-md-max: 768px;
    --viewport-lg-max: 1000px;

    --font-family-title: "Anek Latin";
    --font-family-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    --font-weight-lighter: 100;
    --font-weight-light: 200;
    --font-weight-normal: 400;
    --font-weight-bold: 600;
    --font-weight-extra-bold: 900;
    --font-weight-title: 700;

    --font-size-base: 17px;

    --font-size-h1: calc(var(--font-size-base) + 0.75rem);
    --font-size-h2: calc(var(--font-size-base) + 0.25rem);
    --font-size-h3: var(--font-size-base);
    --font-size-h4: calc(var(--font-size-base) - 0.25rem);
    --font-size-h5: calc(var(--font-size-base) - 0.42rem);
    --font-size-h6: calc(var(--font-size-base) - 0.58rem);

    --line-height: 1.8;

    --padding: 1.25rem;
    --gap: 1.25rem;
    --margin-default: 2rem;

    --border-radius: 5px;
    --border-width: 1px;
    --border-style: solid;
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
    --green: #1de9b6;
    --green-darker: #00b686;

    --menu-text-color: var(--gray-lighter);
    --menu-border: var(--gray-darker);
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
    font-family: var(--font-family-body);
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-base);
    line-height: var(--line-height);
    text-rendering: optimizeLegibility;
    font-smooth: always;
  }

  body {

    --primary-color: var(--white);
    --secondary-color: var(--gray-white);
    --text-color: var(--gray-dark);
    --secondary-text-color: var(--gray-light);

    --accent-color: var(--gray-dark);
    --link-color: var(--green-darker);

    --border-color: var(--gray-lighter);
    --border-default: var(--border-width) var(--border-style) var(--border-color);

    --input-background-color: var(--white);
    --input-text-color: var(--gray);

    --button-background: var(--green-darker);
    --button-foreground: var(--white);
    --tag-background: var(--gray-darker);
    --tag-foreground: var(--green);

    background-color: var(--primary-color);
    color: var(--text-color);
    a {
      color: var(--link-color);
    }
  }

  body.dark {
    --primary-color: var(--gray-black);
    --secondary-color: var(--gray-dark);
    --text-color: var(--gray-white);
    --secondary-text-color: var(--gray-lighter);

    --accent-color: var(--green);
    --link-color: var(--green-darker);

    --border-color: var(--gray-dark);
    --border-default: var(--border-width) var(--border-style) var(--border-color);

    --input-background-color: var(--white);
    --input-text-color: var(--gray);

    --button-background: var(--green-darker);
    --button-foreground: var(--white);
    --tag-background: var(--green-darker);
    --tag-foreground: var(--gray-darker);
  }

  a {
    text-decoration: underline;
    text-decoration-style: dashed;
    text-underline-offset: .15em;
    text-decoration-thickness: 1px;
  }

  b, strong {
    font-weight: var(--font-weight-bold);
  }

  ${Titles}
  ${StackItems}
`;

export const ButtonStyle = css`
  display: inline-block;
  border: var(--border-width);
  border-color: var(--button-border);
  background-color: var(--button-bg);
  color: var(--button-text-color);
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
  border-bottom: var(--border-width);
  /* padding-bottom: 0.25rem; */
  line-height: 24px;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export default GlobalStyle;
