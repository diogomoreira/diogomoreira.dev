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
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(notesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, ...data, slug: realSlug } as NoteItem;
}

function getAllNotes(): NoteItem[] {
  const slugs = getNotesSlugs();
  const posts = slugs
    .map(slug => getNoteBySlug(slug))
    .sort((a, b) => (new Date(a.timestamp) < new Date(b.timestamp) ? -1 : 1));
  return posts;
}

export { getNotesSlugs, getNoteBySlug, getAllNotes };
