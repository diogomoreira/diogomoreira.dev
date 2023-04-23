import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { NoteItem } from "../content.types";
import { ContentPath } from "../paths";

const notesDirectory = join(process.cwd(), ContentPath.NOTES);

function getNotesSlugs() {
  return fs.readdirSync(notesDirectory);
}

function getNoteBySlug(slug: string): NoteItem {
  // TODO: get the real slug
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(notesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, ...data, slug: realSlug } as NoteItem;
}

function getAllNotes(sortFn?: (ts1: Date, ts2: Date) => number): NoteItem[] {
  const slugs = getNotesSlugs();
  const posts = slugs.map((slug) => getNoteBySlug(slug));
  // TODO: sort posts by date in descending order
  return posts;
}

export { getNotesSlugs, getNoteBySlug, getAllNotes };
