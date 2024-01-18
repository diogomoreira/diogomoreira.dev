import React, { useState } from "react";

import { BookmarkItem, getBookmarks } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { v4 as uuidv4 } from "uuid";
import BookmarksList from "@/components/BookmarksList";
import { useTranslation } from "next-i18next";
import { Tags } from "@/components/Tag";
import { Button } from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import PageDescription from "@/components/PageDescription";

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
      <NextSeo title="Links" description="Some links of things i'm enjoying lately" />
      <PageTitle>🏷️ {t("title")}</PageTitle>
      <PageDescription>{t("intro")}</PageDescription>
      <div className="mb-6">
        <Tags>
          {categories.map(tag => (
            <Button
              className={
                tag === currentCategory ? "bg-slate-600 text-slate-200 dark:bg-slate-200 dark:text-slate-600" : ""
              }
              onClick={() => filterCategory(tag)}
              onKeyDown={() => filterCategory(tag)}
              key={uuidv4()}
            >
              {tag}
            </Button>
          ))}
        </Tags>
      </div>
      <BookmarksList links={displayLinks} />
    </>
  );
};

export default BookmarksPage;
