import { PostItem, getAllPosts } from "@/lib/content";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  posts: PostItem[];
};

/**
 * This endpoint retrieves all posts from different sources and aggregate
 * them in a single point.
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const posts = await getAllPosts().then(posts => {
    return posts.sort((firstPostDate, secondPostDate) =>
      firstPostDate.publishedAt > secondPostDate.publishedAt ? -1 : 1,
    );
  });
  res.status(200).json({ posts });
}
