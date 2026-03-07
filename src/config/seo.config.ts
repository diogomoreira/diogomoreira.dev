import { ArticleJsonLdProps, DefaultSeoProps, SocialProfileJsonLdProps } from "next-seo";
import logo from "public/images/logo.png";
import { appConfig } from "./app.config";

const { siteUrl, siteLocale, title, description, author } = appConfig;
const { externalLinks } = author;

const authorTwitter = `@${externalLinks.twitter}`;
const titleTemplate = `${title} | %s`;

export const defaultSeo: DefaultSeoProps = {
  defaultTitle: title,
  titleTemplate: titleTemplate,
  description: description,
  openGraph: {
    siteName: title,
    title: title,
    type: "website",
    locale: siteLocale.replace("-", "_"),
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}${logo.src}`,
        alt: `${title} – ${description}`,
      },
    ],
  },
  twitter: {
    handle: authorTwitter,
    site: authorTwitter,
    cardType: "summary",
  },
};

export const socialProfileJsonLd: SocialProfileJsonLdProps = {
  type: "Person",
  name: author.name,
  url: siteUrl,
  sameAs: [
    `${siteUrl}/`,
    `https://github.com/${externalLinks.github}`,
    `https://keybase.io/${externalLinks.keybase}`,
    `https://twitter.com/${externalLinks.twitter}`,
    `https://www.linkedin.com/in/${externalLinks.linkedin}/`,
    `https://www.instagram.com/${externalLinks.instagram}/`,
  ],
};

// Inspired by https://github.com/jakejarvis/jarv.is/
export const articleJsonLd: Pick<ArticleJsonLdProps, "authorName" | "publisherName" | "publisherLogo"> = {
  authorName: [author.name],
  publisherName: siteUrl,
  publisherLogo: `${siteUrl}${logo.src}`,
};
