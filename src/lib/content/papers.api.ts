import { BibEntry, parseBibFile } from "bibtex";
import { readFileSync } from "fs";
import path, { join } from "path";
import { ContentPath } from "./paths";

const PAPERS_BIBTEX_PATH = path.join(process.cwd(), ContentPath.PAPERS);

export type CustomBibTexEntry = {
  id: string;
  title: string;
  abstract: string;
  doi: string;
  year: string;
  url: string;
  author: string[];
};

export function getPublicationEntries(): CustomBibTexEntry[] {
  const fullPath = join(PAPERS_BIBTEX_PATH, "papers.bib");
  const papersBibFile = readFileSync(fullPath, "utf-8");
  const bibTexEntries = parseBibFile(papersBibFile);
  const customEntries = bibTexEntries.entries_raw.map<CustomBibTexEntry>((entry: BibEntry) => ({
    id: entry._id,
    title: entry.getFieldAsString("title") as string,
    abstract: entry.getFieldAsString("abstract") as string,
    doi: entry.getFieldAsString("doi") as string,
    year: entry.getFieldAsString("year") as string,
    url: entry.getFieldAsString("url") as string,
    author: (entry.getFieldAsString("author") as string).split("and").map(author => author.trim()),
  }));
  return customEntries;
}

export function getPublicationEntriesSorted(): CustomBibTexEntry[] {
  return getPublicationEntries().sort((firstEntry, secondEntry) => (firstEntry.year > secondEntry.year ? -1 : 1));
}
