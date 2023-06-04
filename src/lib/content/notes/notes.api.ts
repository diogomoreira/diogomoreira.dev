import matter from "gray-matter";
import { join } from "path";
import { NoteItem } from "../content.types";
import { ContentPath } from "../paths";
import fs from "fs";
import { readFile, readdir } from "fs/promises";

const notesDirectory = join(process.cwd(), ContentPath.NOTES);

type NoteSlug = {
  slug: string;
  realPath: string;
};

async function getNoteByPath(slug: string): Promise<NoteItem> {
  const fullPath = join(notesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, ...data, slug } as NoteItem;
}

async function getNotesSlugs(): Promise<NoteSlug[]> {
  const files = await readdir(notesDirectory);
  const slugs: NoteSlug[] = [];
  for (const file of files) {
    const realPath = join(notesDirectory, file);
    const fileContent = await readFile(realPath, { encoding: "utf-8" });
    const frontMatter = matter(fileContent);
    slugs.push({ slug: frontMatter.data["slug"], realPath });
  }
  return slugs;
}

async function getAllNotes(): Promise<NoteItem[]> {
  const noteSlug = await getNotesSlugs();
  return Promise.all(noteSlug.map(({ slug }) => getNoteByPath(slug)));
}

export { getNoteByPath, getAllNotes, getNotesSlugs, type NoteSlug };
