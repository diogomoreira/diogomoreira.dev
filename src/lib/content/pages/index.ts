import matter from "gray-matter";
import { join } from "path";
import { ContentPath } from "../paths";
import { readFileSync } from "fs";
import { Page, PageSchema } from "../../../models/page.model";

const pagesDirectory = join(process.cwd(), ContentPath.PAGES);

function getPageBySlug(...slug: string[]): Page {
  const fullSlug = slug.join("/");
  const fullPath = join(pagesDirectory, `${fullSlug}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const { title, description, cover, published, updated } = data;
  return PageSchema.parse({ title, description, content, cover, published, updated });
}

export { getPageBySlug };
