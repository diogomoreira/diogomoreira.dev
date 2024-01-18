import { readdir } from "fs/promises";
import { ContentPath } from "./paths";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { PageItem } from "./content.types";

const pagesDirectory = join(process.cwd(), ContentPath.PAGES);

async function getPageByPath(slug: string): Promise<PageItem> {
  const fullPath = join(pagesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const {
    title,
    icon,
    description,
    cover,
    published,
    updated
  } = data;
  return { title, icon, description, slug, content, coverImage: cover, publishedAt: published, updatedAt: updated } as PageItem;
}

async function getPagesSlugs(): Promise<string[]> {
  const files = await readdir(pagesDirectory);
  return files.map((value) => value.split(".md")[0]);
}

export { getPagesSlugs, getPageByPath };
