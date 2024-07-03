import React from "react";

import Layout from "@/components/Layout";
import "flag-icons/css/flag-icons.min.css";
import "prism-themes/themes/prism-nord.css";
import { useEffect } from "react";

import { defaultSeo } from "@/config/seo.config";
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import { cn } from "@/utils/cn";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "nextjs-google-analytics";
import NProgress from "nprogress";

const hubot = localFont({
  src: "../../public/fonts/HubotSans/Hubot-Sans.woff2",
  preload: true,
  display: "swap",
  variable: "--font-hubot",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <ThemeProvider attribute="class">
      <Layout className={cn(hubot.variable, inter.variable, "font-sans", "duration-200", "transition-colors")}>
        <GoogleAnalytics trackPageViews />
        <DefaultSeo
          {...defaultSeo}
          // don't let search engines index branch/deploy previews
          dangerouslySetAllPagesToNoIndex={process.env.NEXT_PUBLIC_CONTEXT !== "production"}
          dangerouslySetAllPagesToNoFollow={process.env.NEXT_PUBLIC_CONTEXT !== "production"}
        />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
