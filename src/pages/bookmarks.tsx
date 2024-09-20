import React from "react";

import PageTitle from "@/components/PageTitle";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { Bookmark } from "../models/bookmark.model";
import { BookmarkList } from "../components/Bookmarks";
import { getBookmarks } from "../lib/content/bookmarks";

type BookmarksPageStaticProps = { items: Bookmark[] };

export const getStaticProps: GetStaticProps<BookmarksPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  const bookmarks = getBookmarks();
  return {
    props: {
      items: bookmarks,
      ...(await serverSideTranslations(currentLocale, ["bookmarks", "common"])),
    },
  };
};

type BookmarksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BookmarksPage: NextPage<BookmarksPageProps> = ({ items }: BookmarksPageProps) => {
  const { t } = useTranslation("bookmarks");
  return (
    <>
      <NextSeo title="Bookmarks" description="Some things I'm really into lately" />
      <PageTitle>{t("title")}</PageTitle>
      <p>{t("intro")}</p>
      <BookmarkList items={items} />
    </>
  );
};

export default BookmarksPage;
