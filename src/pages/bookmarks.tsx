import React, { useEffect, useState } from "react";

import PageTitle from "@/components/PageTitle";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { getProjects } from "@/lib/content/projects";
import { Project } from "@/models/project.model";
import { Bookmark, BookmarkType } from "../models/bookmark.model";
import { BOOKMARKS_API_ENDPOINT } from "./api/bookmarks";
import LoadingState from "../components/Layout/LoadingState";
import { appConfig } from "../config";
import { BookmarkList } from "../components/Bookmarks";
import { Button } from "../components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import EmptyState, { EmptyContentType } from "../components/Layout/EmptyState";

type BookmarksPageStaticProps = { items: Project[] };

export const getStaticProps: GetStaticProps<BookmarksPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const items = getProjects();
  return {
    props: {
      items,
      ...(await serverSideTranslations(currentLocale, ["bookmarks", "common"])),
    },
  };
};

type BookmarksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BookmarkTypeOptions = [
  { label: "All", value: "" },
  { label: "Article", value: BookmarkType.ARTICLE },
  { label: "Book", value: BookmarkType.BOOK },
  { label: "Podcast", value: BookmarkType.PODCAST },
  { label: "TV Series", value: BookmarkType.TVSERIES },
  { label: "App", value: BookmarkType.APP },
  { label: "Movie", value: BookmarkType.MOVIE },
  { label: "Game", value: BookmarkType.GAME },
  { label: "Music", value: BookmarkType.MUSIC },
  { label: "Video", value: BookmarkType.VIDEO },
];

const BookmarksPage: NextPage<BookmarksPageProps> = ({ items }: Readonly<BookmarksPageStaticProps>) => {
  const { t } = useTranslation("bookmarks");

  const { siteUrl } = appConfig;

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [fetching, setFetching] = useState(true);
  const [type, setType] = useState<BookmarkType>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const buildBookmarkUrl = () => {
    const url = new URL(`${siteUrl}/${BOOKMARKS_API_ENDPOINT}`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("pageSize", pageSize.toString());
    if (type) {
      url.searchParams.append("type", type);
    }
    return url;
  };

  useEffect(() => {
    setError("");
    setFetching(true);
    fetch(buildBookmarkUrl())
      .then(res => res.json())
      .then(data => {
        setBookmarks(data.items as Bookmark[]);
        setTotal(data.total);
        setFetching(false);
      })
      .catch(err => {
        setError("Error fetching bookmarks");
      });
  }, [page, pageSize, type]);

  function enableNextPage() {
    return total > page * pageSize + pageSize;
  }

  function enablePreviousPage() {
    return page > 0;
  }

  function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.target.value as BookmarkType);
  }

  function handlePageChange(pageChange: number) {
    setPage(page + pageChange);
  }

  function handleItemsPerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(event.target.value));
  }

  return (
    <>
      <NextSeo title="Bookmarks" description="Some things I'm really into lately" />
      <PageTitle>{t("title")}</PageTitle>
      <p>{t("intro")}</p>
      <div className="flex flex-col md:flex-row rounded-lg p-4 gap-4 items-center bg-spring-wood-100 dark:bg-neutral-800 text-sm">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Category:</span>
          <select
            onChange={e => handleTypeChange(e)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 bg-spring-wood-50 dark:bg-black text-gray-600 dark:text-gray-400 hover:bg-spring-wood-200 dark:hover:bg-neutral-950 border-0 selection:border-0"
            title="bookmark-type"
          >
            {BookmarkTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Items Per Page:</span>
          <select
            onChange={e => handleItemsPerPageChange(e)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 bg-spring-wood-50 dark:bg-black text-gray-600 dark:text-gray-400 hover:bg-spring-wood-200 dark:hover:bg-neutral-950 border-0 selection:border-0"
            title="bookmark-type"
          >
            {[5, 10, 20].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {!fetching ? (
          <BookmarkList items={bookmarks} />
        ) : error ? (
          <EmptyState type={EmptyContentType.BOOKMARKS} />
        ) : (
          <LoadingState />
        )}
      </div>
      <hr className="mb-6" />
      <div className="flex gap-4 justify-between">
        <Button disabled={!enablePreviousPage()} onClick={e => handlePageChange(-1)} className="w-36 flex gap-2">
          <FaArrowLeft />
          <span>Previous</span>
        </Button>
        <Button disabled={!enableNextPage()} onClick={e => handlePageChange(+1)} className="w-36 flex gap-2">
          <span>Next</span>
          <FaArrowRight />
        </Button>
      </div>
    </>
  );
};

export default BookmarksPage;
