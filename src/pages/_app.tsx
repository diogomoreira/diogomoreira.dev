import Layout from "@/components/Layout";
import "prism-themes/themes/prism-vsc-dark-plus.css";

import { Fira_Code as Fira } from "@next/font/google";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import { useAppMetadata } from "@/lib/config";
import { defaultSeo } from "@/lib/config/seo.config";
import "@/styles/globals.scss";
import { DefaultSeo } from "next-seo";

const fontFamilyMonospace = Fira({
  subsets: ["latin"],
  variable: "--font-family-monospace",
});

const App = ({ Component, pageProps }: AppProps) => {
  const { siteUrl, title, author } = useAppMetadata();
  const authorTwitter = `@${author.twitter}`;
  const titleTemplate = `${title} | %s`;
  return (
    <Layout className={fontFamilyMonospace.variable}>
      <DefaultSeo
        {...defaultSeo}
        // don't let search engines index branch/deploy previews
        dangerouslySetAllPagesToNoIndex={
          process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
        }
        dangerouslySetAllPagesToNoFollow={
          process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
        }
      />
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
