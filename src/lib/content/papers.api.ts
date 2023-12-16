import { BibEntry, parseBibFile } from "bibtex";
import { readFileSync } from "fs";
import path, { join } from "path";
import { ContentPath } from "./paths";
import { PaperItem } from "./content.types";

const PAPERS_BIBTEX_PATH = path.join(process.cwd(), ContentPath.PAPERS);

export function getPublicationEntries(): PaperItem[] {
  const fullPath = join(PAPERS_BIBTEX_PATH, "papers.bib");
  const papersBibFile = readFileSync(fullPath, "utf-8");
  const bibTexEntries = parseBibFile(papersBibFile);
  const customEntries = bibTexEntries.entries_raw.map<PaperItem>((entry: BibEntry) => ({
    id: entry._id,
    title: entry.getFieldAsString("title") as string,
    abstract: entry.getFieldAsString("abstract") as string,
    doi: entry.getFieldAsString("doi") as string,
    year: entry.getFieldAsString("year") as string,
    url: entry.getFieldAsString("url") as string,
    author: (entry.getFieldAsString("author") as string).split("and").map(author => author.trim()),
    media: (entry.getFieldAsString("journal") as string) || (entry.getFieldAsString("booktitle") as string),
  }));
  return customEntries;
}

export function getPublicationEntriesSorted(): PaperItem[] {
  return getPublicationEntries().sort((firstEntry, secondEntry) => (firstEntry.year > secondEntry.year ? -1 : 1));
}
