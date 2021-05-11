import { createGlobalStyle } from "styled-components"
import * as v from "./variables"

export const transitionDuration = "200ms"

const GlobalStyle = createGlobalStyle`

  :root {
    --white: #F8F8F8;
    --black: #141414;

    --white-rbg: 248, 248, 248;
    --black-rgb: 20, 20, 20;

    --gray-lighter: #F8F9FA;
    --gray-light: #DEE2E6;
    --gray: #ADB5BD;
    --gray-dark: #495057;
    --gray-darker: #212529;

    --gray-lighter-rgb: 248, 249, 250;
    --gray-light-rgb: 222, 226, 230;
    --gray-rgb: 173, 181, 189;
    --gray-dark-rgb: 73, 80, 87;
    --gray-darker-rgb: 33, 37, 41;


    --blue: #345995;
    --orange: #FF8811;
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
  body {
    line-height: 1;
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
    font-weight: ${v.fontWeight.normal};
    line-height: 1.8;
    text-rendering: optimizeLegibility;
  }

  body {
    --bg: var(--white);
    --fg: var(--black);
    --textColor: var(--fg);
    --linkColor: var(--blue);
    --menuLinkColor: var(--gray-dark);
    --borderColor: rgba(var(--gray-light-rgb), 0.9);
    --menuTitleColor: var(--gray-dark);

    background-color: var(--bg);
    color: var(--fg);
    transition: ${transitionDuration};
    a {
      color: var(--linkColor);
    }
  }

  body.dark {
    --bg: var(--black);
    --fg: var(--white);
    --menuLinkColor: var(--gray-light);
    --borderColor: rgba(var(--gray-light-rgb), 0.2);
    --menuTitleColor: var(--gray-light);
    --linkColor: var(--orange);
  }

  b, strong {
    font-weight: ${v.fontWeight.bold};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${v.fontWeight.title};
  }

  h1 {
	  font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.17rem;
  }
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: .83rem;
  }
  h6 {
    font-size: .67rem;
  }

`

export default GlobalStyle
