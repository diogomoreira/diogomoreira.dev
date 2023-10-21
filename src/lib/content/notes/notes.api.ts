import matter from "gray-matter";
import { join } from "path";
import { NoteItem } from "../content.types";
import { ContentPath } from "../paths";
import fs from "fs/promises";

const notesDirectory = join(process.cwd(), ContentPath.NOTES);

async function getNoteByPath(slug: string): Promise<NoteItem> {
  const fullPath = join(notesDirectory, `${slug}.md`);
  return fs.readFile(fullPath, { encoding: "utf8" }).then((fileContent: string) => {
    const { content, data } = matter(fileContent);
    return {
      body: content,
      category: data.category,
      cover: data.cover,
      description: data.description,
      tags: data.tags,
      timestamp: data.timestamp,
      title: data.title,
      slug: slug,
    };
  });
}

async function getNotesSlugs(): Promise<string[]> {
  return fs
    .readdir(notesDirectory)
    .then(files => files.map(file => file.replace(/\.[^/.]+$/, "")))
    .then(promises => Promise.all(promises));
}

async function getAllNotes(): Promise<NoteItem[]> {
  const noteSlug = await getNotesSlugs();
  return Promise.all(noteSlug.map(slug => getNoteByPath(slug)));
}

export { getNoteByPath, getAllNotes, getNotesSlugs };
