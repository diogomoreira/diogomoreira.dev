import { PaperItem } from "@/lib/content";
import React from "react";
import { ExternalLinkButton } from "../Button";

type PaperItemDisplayProps = {
  item: PaperItem;
};

const PaperItemDisplay: React.FC<PaperItemDisplayProps> = ({ item }: PaperItemDisplayProps) => {
  return (
    <details
      className="shadow-md overflow-hidden rounded-md bg-spring-wood-100 dark:bg-neutral-950 border border-spring-wood-200 dark:border-neutral-900"
      key={item.id}
    >
      <summary className="font-semibold line-clamp-1 p-4">{item.title}</summary>
      <div className="text-spring-wood-600 dark:text-neutral-400 px-4 mb-2">{item.media}</div>
      <p className="bg-spring-wood-50 dark:bg-neutral-800 text-sm leading-relaxed p-4">{item.abstract}</p>
      <div className="flex items-center justify-between bg-spring-wood-100 dark:bg-neutral-950 px-4 py-2 text-sm">
        <span>{item.author.join(", ")}</span>
        <ExternalLinkButton href={`https://www.doi.org/${item.doi}`}>Download</ExternalLinkButton>
      </div>
    </details>
  );
};

export default PaperItemDisplay;
