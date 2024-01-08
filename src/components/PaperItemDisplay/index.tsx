import { PaperItem } from "@/lib/content";
import React from "react";
import { ExternalLinkButton } from "../Button";

type PaperItemDisplayProps = {
  item: PaperItem;
};

const PaperItemDisplay: React.FC<PaperItemDisplayProps> = ({ item }: PaperItemDisplayProps) => {
  return (
    <details className="rounded-md shadow-md bg-slate-200 dark:bg-slate-800 border dark:border-slate-700" key={item.id}>
      <summary className="font-semibold line-clamp-1 p-4">{item.title}</summary>
      <div className="text-slate-600 dark:text-slate-400 px-4">{item.media}</div>
      <p className="text-sm leading-relaxed p-4">{item.abstract}</p>
      <div className="flex items-center justify-between bg-slate-300 dark:bg-slate-900 px-4 py-2 text-sm">
        <span>{item.author.join(", ")}</span>
        <ExternalLinkButton href={`https://www.doi.org/${item.doi}`}>Download</ExternalLinkButton>
      </div>
    </details>
  );
};

export default PaperItemDisplay;
