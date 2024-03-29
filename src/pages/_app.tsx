import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import "prism-themes/themes/prism-nord.css";
import "flag-icons/css/flag-icons.min.css";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NProgress from "nprogress";
import { defaultSeo } from "@/config/seo.config";
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <AnimatePresence mode="wait" initial={false}>
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
    </AnimatePresence>
  );
};

export default appWithTranslation(App);
