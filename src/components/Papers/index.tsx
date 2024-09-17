import React from "react";
import { Paper } from "@/models/paper.model";
import { Button } from "../ui/button";

type PaperItemProps = {
  item: Paper;
};

const PaperItem: React.FC<PaperItemProps> = ({ item }: PaperItemProps) => {
  return (
    <details
      className="text-sm shadow-lgoverflow-hidden rounded-lg bg-spring-wood-200 dark:bg-neutral-950 border-4 border-spring-wood-200/[.5] dark:border-neutral-800/[.5]"
      key={item.id}
    >
      <summary className="font-semibold line-clamp-1 p-4 flex gap-4">
        <span className="font-mono">{item.year}</span>
        <span>{item.title}</span>
      </summary>
      <div className="bg-spring-wood-100 dark:bg-neutral-700 text-spring-wood-600 dark:text-neutral-200 p-4">
        {item.media}
      </div>
      <p className="bg-spring-wood-50 dark:bg-neutral-800 text-sm leading-relaxed p-4 my-0">{item.abstract}</p>
      <div className="flex items-center justify-between text-spring-wood-600 dark:text-neutral-200 bg-spring-wood-100 dark:bg-neutral-700 px-4 py-2 text-sm">
        <span>{item.author.join(", ")}</span>
        <Button variant="default" asChild>
          <a href={`https://www.doi.org/${item.doi}`} target="_blank" rel="noreferrer">
            Download
          </a>
        </Button>
      </div>
    </details>
  );
};

export { PaperItem };
