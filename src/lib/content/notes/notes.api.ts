import matter from "gray-matter";
import { join } from "path";
import { NoteItem } from "../content.types";
import { ContentPath } from "../paths";
import fs from "fs";

const notesDirectory = join(process.cwd(), ContentPath.NOTES);

function getNoteBySlug(slug: string[]): NoteItem {
  const realSlug = slug.join("/");
  const fullPath = join(notesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(fileContents);
  return { content, ...data, slug: realSlug } as NoteItem;
}

function getNotesSlugs(contentDir?: string): string[][] {
  const dir = contentDir ?? notesDirectory;
  const paths: string[][] = [];
  fs.readdirSync(dir).forEach(file => {
    const path = `${dir}/${file}`;
    if (fs.statSync(path).isDirectory()) {
      paths.push(...getNotesSlugs(path));
    } else {
      const slug = path.replace(`${notesDirectory}/`, "").replace(".md", "").split("/");
      paths.push(slug);
    }
  });
  return paths;
}

function getAllNotes(): NoteItem[] {
  const slugs = getNotesSlugs(notesDirectory);
  const posts = slugs
    .map(slug => getNoteBySlug(slug))
    .sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1));
  return posts;
}

export { getNoteBySlug, getAllNotes, getNotesSlugs };
