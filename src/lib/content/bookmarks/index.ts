import { Bookmark, BookmarkArraySchema } from "@/models/bookmark.model";
import { readFileSync } from "fs";
import { join } from "path";
import { ContentPath } from "../paths";

const bookmarkDirectory = join(process.cwd(), ContentPath.BOOKMARKS);
const bookmarkFile = join(bookmarkDirectory, "bookmarks.json");

export function getBookmarks(): Bookmark[] {
  return BookmarkArraySchema.parse(JSON.parse(readFileSync(bookmarkFile, { encoding: "utf-8" }))).sort((link1, link2) =>
    Date.parse(link1.date) < Date.parse(link2.date) ? 1 : -1,
  );
}
