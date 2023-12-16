import { useAppConfig } from "@/config";
import { PostItem } from "./content.types";

export async function getAllPosts(page?: number, postsPerPage?: number): Promise<PostItem[]> {
  const {
    author: { github },
  } = useAppConfig();
  const start = page ?? 0;
  const perPage = postsPerPage ?? 4;
  return fetch(`https://dev.to/api/articles/latest?username=${github}&per_page=${perPage}&page=${start}`).then(
    response => response.json(),
  );
}
