import React from "react";
import LinkItemDisplay from "@/components/LinkItemDisplay";
import { LinkItem, getLinks } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";

type LinksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LinksPage: NextPage<LinksPageProps> = ({ links }: LinksPageProps) => {
  return (
    <>
      <NextSeo title="Home Page" description="Some links of things i'm enjoying lately" />
      <h1>💾 Links</h1>
      <p>
        This is where I&apos;ll be sharing some cool stuff I&apos;ve been really into lately. From groovy tunes that get
        me moving to podcasts that keep me thinking, and books that I just can&apos;t put down, I&apos;ll be dropping
        some recommendations for things I&apos;ve been loving. Take a peek and see if anything catches your fancy! Who
        knows, you might just find your new obsession.
      </p>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1 }}>
        <Masonry gutter="1rem">
          {links.map(item => (
            <LinkItemDisplay key={uuidv4()} item={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ links: LinkItem[] }> = async ({ locale }) => {
  const links = getLinks();
  return {
    props: {
      links: links,
      ...(await serverSideTranslations(locale || "en", ["links"])),
    },
  };
};

export default LinksPage;
