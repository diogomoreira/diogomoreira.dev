import React, { useState } from "react";
import styles from "@/styles/components/bookmark.module.scss";

import { BookmarkItem, getBookmarks } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { v4 as uuidv4 } from "uuid";
import BookmarksList from "@/components/BookmarksList";
import { Content } from "@/components/Layout/Content";
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticProps<{ links: BookmarkItem[] }> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const links = getBookmarks(currentLocale);
  return {
    props: {
      links: links,
      ...(await serverSideTranslations(currentLocale, ["bookmarks", "common"])),
    },
  };
};

type BookmarksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BookmarksPage: NextPage<BookmarksPageProps> = ({ links }: BookmarksPageProps) => {
  const [displayLinks, setDisplayLinks] = useState(links);
  const categories = Array.from(new Set(links.flatMap(link => link.type)));
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const { t } = useTranslation("bookmarks");

  const filterCategory = (category: string) => {
    const newDisplayLinks = category === currentCategory ? links : links.filter(link => link.type === category);
    setDisplayLinks(newDisplayLinks);
    setCurrentCategory(category !== currentCategory ? category : null);
  };

  return (
    <>
      <Content>
        <NextSeo title="Links" description="Some links of things i'm enjoying lately" />
        <h1>🏷️ {t("title")}</h1>
        <p>{t("intro")}</p>
        <div className={styles.bookmarkTypesContainer}>
          <div className={styles.bookmarkItemTags}>
            {categories.map(tag => (
              <span
                role="button"
                onClick={() => filterCategory(tag)}
                onKeyDown={() => filterCategory(tag)}
                className={tag === currentCategory ? styles.bookmarkTypeSelectorCurrent : styles.bookmarkTypeSelector}
                key={uuidv4()}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Content>
      <Content>
        <BookmarksList links={displayLinks} />
      </Content>
    </>
  );
};

export default BookmarksPage;
