import React from "react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-slate-50 dark:bg-slate-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
