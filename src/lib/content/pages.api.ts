import fs from "fs";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { PageItem } from "./content.types";
import { ContentPath } from "./paths";

const pagesDirectory = join(process.cwd(), ContentPath.PAGES);

async function getPageByPath(slug: string): Promise<PageItem> {
  const fullPath = join(pagesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const { title, icon, description, cover, published, updated } = data;
  return {
    title,
    description,
    slug,
    content,
    coverImage: cover,
    publishedAt: published,
    updatedAt: updated,
  } as PageItem;
}

async function getPagesSlugs(): Promise<string[]> {
  const files = await readdir(pagesDirectory);
  return files.map(value => value.split(".md")[0]);
}

export { getPageByPath, getPagesSlugs };
