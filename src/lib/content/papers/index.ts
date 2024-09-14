import { BibEntry, parseBibFile } from "bibtex";
import { readFileSync } from "fs";
import path from "path";
import { ContentPath } from "../paths";
import { Paper, PaperSchema } from "@/models/paper.model";

const papersFile = path.join(process.cwd(), ContentPath.PAPERS);

export function getPublicationEntries(): Paper[] {
  const papersBibFile = readFileSync(papersFile, "utf-8");
  const bibTexEntries = parseBibFile(papersBibFile);
  return bibTexEntries.entries_raw
    .map<Paper>((entry: BibEntry) => {
      return PaperSchema.parse({
        id: entry._id,
        title: entry.getFieldAsString("title") as string,
        abstract: entry.getFieldAsString("abstract") as string,
        doi: entry.getFieldAsString("doi") as string,
        year: entry.getFieldAsString("year") as string,
        url: entry.getFieldAsString("url") as string,
        author: (entry.getFieldAsString("author") as string).split("and").map(author => author.trim()),
        media: (entry.getFieldAsString("journal") as string) || (entry.getFieldAsString("booktitle") as string),
      });
    })
    .sort((firstEntry, secondEntry) => (firstEntry.year > secondEntry.year ? -1 : 1));
}
