import React, { useState } from "react";
import LinkItemDisplay from "@/components/LinkItemDisplay";
import styles from "@/styles/components/linkitem.module.scss";

import { LinkItem, getLinks } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { v4 as uuidv4 } from "uuid";
import LinksList from "@/components/LinksList";
import { Content, ContentFluid } from "@/components/Layout/Content";

type LinksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LinksPage: NextPage<LinksPageProps> = ({ links }: LinksPageProps) => {
  const [displayLinks, setDisplayLinks] = useState(links);
  const categories = Array.from(new Set(links.flatMap(link => link.type)));
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const filterCategory = (category: string) => {
    const newDisplayLinks = category === currentCategory ? links : links.filter(link => link.type === category);
    setDisplayLinks(newDisplayLinks);
    setCurrentCategory(category !== currentCategory ? category : null);
  };

  return (
    <>
      <Content>
        <NextSeo title="Home Page" description="Some links of things i'm enjoying lately" />
        <h1>💾 Links</h1>
        <p>
          This is where I&apos;ll be sharing some cool stuff I&apos;ve been really into lately. From groovy tunes that
          get me moving to podcasts that keep me thinking, and books that I just can&apos;t put down, I&apos;ll be
          dropping some recommendations for things I&apos;ve been loving. Take a peek and see if anything catches your
          fancy!
        </p>
        <div className={styles.linkTypesContainer}>
          <div className={styles.linkItemTags}>
            {categories.map(tag => (
              <span
                onClick={() => filterCategory(tag)}
                className={tag === currentCategory ? styles.linkTypeSelectorCurrent : styles.linkTypeSelector}
                key={uuidv4()}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Content>
      <ContentFluid>
        <LinksList links={displayLinks} />
      </ContentFluid>
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
