import bookmarksJSON from "@/content/bookmarks/bookmarks.json";
import { BookmarkItem } from ".";

type BookmarkJSONObject = {
  title: string;
  type: string;
  link: string;
  description: {
    [key: string]: string;
  };
  image: string;
  publishDate: string;
  tags: string[];
};

export function getBookmarks(lang: string): BookmarkItem[] {
  const bookmarks: BookmarkJSONObject[] = bookmarksJSON as BookmarkJSONObject[];
  return bookmarks
    .filter(bookmark => lang in bookmark.description)
    .map<BookmarkItem>(bookmark => {
      return {
        title: bookmark.title,
        type: bookmark.type,
        link: bookmark.link,
        description: bookmark.description[lang],
        image: bookmark.image,
        timestamp: bookmark.publishDate,
        tags: bookmark.tags,
      };
    })
    .sort((link1, link2) => (new Date(link1.timestamp) < new Date(link2.timestamp) ? 1 : -1));
}
