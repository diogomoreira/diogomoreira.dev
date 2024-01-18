import { useAppConfig } from "@/config";
import { PostItem } from "./content.types";
import { ContentPath } from "./paths";
import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import { readFile, readdir } from "fs/promises";
import { v4 as uuid } from "uuid";

type DevToApiObjectResponse = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: string | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: 12439;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
  };
};

export async function getPostsFromDevTo(page?: number, postsPerPage?: number): Promise<PostItem[]> {
  const {
    author: { github },
  } = useAppConfig();
  const start = page ?? 0;
  const perPage = postsPerPage ?? 4;
  return fetch(`https://dev.to/api/articles/latest?username=${github}&per_page=${perPage}&page=${start}`)
    .then(response => response.json())
    .then((json: DevToApiObjectResponse[]) =>
      json.map<PostItem>(item => ({
        id: String(item.id),
        title: item.title,
        description: item.description,
        url: item.url,
        content: "",
        coverImage: item.cover_image,
        publishedAt: new Date(item.published_at).toISOString(),
        tags: item.tag_list,
        origin: "dev.to",
      })),
    );
}

const notesDirectory = join(process.cwd(), ContentPath.POSTS);

type PostSlug = {
  slug: string;
  realPath: string;
};

async function getPostByPath(slug: string): Promise<PostItem> {
  const fullPath = join(notesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const { title, description, cover, date, tags } = data;
  const id = uuid();
  const url = `blog/${slug}`;
  const origin = "md";
  return { id, title, description, url, content, coverImage: cover, publishedAt: date, tags, origin } as PostItem;
}

async function getPostsSlugs(): Promise<PostSlug[]> {
  const files = await readdir(notesDirectory);
  const slugs: PostSlug[] = [];
  for (const file of files) {
    const realPath = join(notesDirectory, file);
    const fileContent = await readFile(realPath, { encoding: "utf-8" });
    const frontMatter = matter(fileContent);
    slugs.push({ slug: frontMatter.data["slug"], realPath });
  }
  return slugs;
}

async function getPostsFromMarkdown(): Promise<PostItem[]> {
  const noteSlug = await getPostsSlugs();
  return Promise.all(noteSlug.map(({ slug }) => getPostByPath(slug)));
}

async function getAllPosts(): Promise<PostItem[]> {
  return Promise.all([getPostsFromDevTo(), getPostsFromMarkdown()]).then(response => response.flat(1));
}

export { getAllPosts, getPostByPath, getPostsSlugs };
