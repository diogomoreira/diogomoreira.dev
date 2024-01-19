import React from "react";
import { Head, Html, Main, NextScript } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <SpeedInsights />
      </body>
    </Html>
  );
}
