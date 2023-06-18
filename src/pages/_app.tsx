import React from "react";
import Layout from "@/components/Layout";
import "prism-themes/themes/prism-nord.css";

import { Inconsolata, Nunito, Work_Sans } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import "@/styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { defaultSeo } from "@/lib/config/seo.config";

const fontFamilyMonospace = Inconsolata({
  subsets: ["latin"],
  variable: "--font-family-monospace",
});

const fontFamilyTitle = Work_Sans({
  subsets: ["latin-ext"],
  variable: "--font-family-title",
});

const fontFamilyBody = Nunito({
  subsets: ["latin"],
  variable: "--font-family-body",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout className={`${fontFamilyMonospace.variable} ${fontFamilyTitle.variable} ${fontFamilyBody.variable}`}>
      <DefaultSeo
        {...defaultSeo}
        // don't let search engines index branch/deploy previews
        dangerouslySetAllPagesToNoIndex={process.env.CONTEXT !== "production"}
        dangerouslySetAllPagesToNoFollow={process.env.CONTEXT !== "production"}
      />
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
