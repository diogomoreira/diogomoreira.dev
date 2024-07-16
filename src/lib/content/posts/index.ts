import { ContentPath } from "../paths";
import matter from "gray-matter";
import { join, extname } from "path";
import fs, { lstatSync, readdirSync } from "fs";
import { Post, PostSchema } from "@/models/post.model";

const postsDirectory = join(process.cwd(), ContentPath.POSTS);
const allowedTypes = [".md", ".mdx"];

type PostSlug = {
  slug: string[];
};

function getPostsSlugs(): PostSlug[] {
  const files = readdirSync(postsDirectory, { recursive: true, encoding: "utf-8" });
  return files
    .filter(file => !lstatSync(join(postsDirectory, file)).isDirectory())
    .filter(file => allowedTypes.includes(extname(file)))
    .map(file => file.split(".")[0])
    .map(file => (file.includes("/") ? file.split("/") : [file]))
    .map(file => ({ slug: file }));
}

function getPostByPath(...slug: string[]): Post {
  const fullSlug = slug.join("/");
  const fullPath = join(postsDirectory, `${fullSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const { title, description, cover, date, lang, comments, tags } = data;
  const blogSlug = `blog/${fullSlug}`;
  return PostSchema.parse({ title, description, path: blogSlug, content, cover, date, lang, comments, tags });
}

function getAllPosts(): Post[] {
  return getPostsSlugs()
    .map(postSlug => getPostByPath(...postSlug.slug))
    .sort((p1, p2) => (Date.parse(p1.date) < Date.parse(p2.date) ? 1 : -1));
}

export { getAllPosts, getPostsSlugs, getPostByPath };
