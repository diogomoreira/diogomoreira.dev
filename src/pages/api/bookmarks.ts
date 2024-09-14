import type { NextApiRequest, NextApiResponse } from "next";
import { Bookmark } from "../../models/bookmark.model";
import { getBookmarks } from "../../lib/content/bookmarks";

type ResponseMessage = {
  message: string;
};

type ResponseBookmark = {
  items: Bookmark[];
  total: number;
};

export const BOOKMARKS_API_ENDPOINT = `/api/bookmarks`;

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseMessage | ResponseBookmark>) {
  if (req.method !== "GET") {
    res.status(400).send({ message: "This endpoint only allows GET requests" });
  }
  const { page, pageSize, type } = req.query;
  const requestedPage = Number(page) || 0;
  const requestedPageSize = Number(pageSize) || 10;

  const bookmarks = getBookmarks().filter(bookmark => bookmark.type === type || !type);
  const start = requestedPage * requestedPageSize;
  const end = start + requestedPageSize;
  const paginatedBookmarks = bookmarks.slice(start, end);

  res.status(200).json({ items: paginatedBookmarks, total: bookmarks.length });
}
