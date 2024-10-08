import path from "path";
import { ContentPath } from "../paths";
import { readFileSync } from "fs";
import { Bookmark, BookmarkArraySchema } from "../../../models/bookmark.model";
import { isAfter } from "date-fns";

const bookmarksFile = path.join(process.cwd(), ContentPath.BOOKMARKS);

function getBookmarks(): Bookmark[] {
  const bookmarks = BookmarkArraySchema.parse(JSON.parse(readFileSync(bookmarksFile, "utf-8")));
  return bookmarks.sort((bm1, bm2) => (isAfter(bm1.bookmarkedOn, bm2.bookmarkedOn) ? -1 : 1));
}

export { getBookmarks };
