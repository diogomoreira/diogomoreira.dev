import Layout from "@/components/Layout";
import React from "react";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Inconsolata } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { defaultSeo } from "@/config/seo.config";
import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";

const fontFamilyMonospace = Inconsolata({
  subsets: ["latin"],
  variable: "--font-family-monospace",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <GoogleAnalytics trackPageViews />
        <DefaultSeo
          {...defaultSeo}
          // don't let search engines index branch/deploy previews
          dangerouslySetAllPagesToNoIndex={process.env.NEXT_PUBLIC_CONTEXT !== "production"}
          dangerouslySetAllPagesToNoFollow={process.env.NEXT_PUBLIC_CONTEXT !== "production"}
        />
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
