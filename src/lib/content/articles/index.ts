import { ContentPath } from "../paths";
import matter from "gray-matter";
import { join, extname } from "path";
import fs, { lstatSync, readdirSync } from "fs";
import { Article, ArticleSchema } from "@/models/article.model";

const articlesDirectory = join(process.cwd(), ContentPath.ARTICLES);
const allowedTypes = [".md", ".mdx"];

type ArticleSlug = {
  slug: string[];
};

function getSlugs(): ArticleSlug[] {
  const files = readdirSync(articlesDirectory, { recursive: true, encoding: "utf-8" });
  return files
    .filter(file => !lstatSync(join(articlesDirectory, file)).isDirectory())
    .filter(file => allowedTypes.includes(extname(file)))
    .map(file => file.split(".")[0])
    .map(file => (file.includes("/") ? file.split("/") : [file]))
    .map(file => ({ slug: file }));
}

function getArticleByPath(...slug: string[]): Article {
  const fullSlug = slug.join("/");
  const fullPath = join(articlesDirectory, `${fullSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  const { title, description, cover, date, lang, comments, tags } = data;
  const blogSlug = `articles/${fullSlug}`;
  return ArticleSchema.parse({ title, description, path: blogSlug, content, cover, date, lang, comments, tags });
}

function getAllArticles(): Article[] {
  return getSlugs()
    .map(articleSlug => getArticleByPath(...articleSlug.slug))
    .sort((p1, p2) => (Date.parse(p1.date) < Date.parse(p2.date) ? 1 : -1));
}

export { getAllArticles, getSlugs, getArticleByPath };
