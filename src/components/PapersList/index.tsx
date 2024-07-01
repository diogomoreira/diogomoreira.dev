import { PaperItem } from "@/lib/content";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import PaperItemDisplay from "../PaperItemDisplay";

type PapersListProps = {
  items: PaperItem[];
};

const PapersList: React.FC<PapersListProps> = ({ items }: PapersListProps) => {
  const itemsPerYear = [...new Set(items.map(item => item.year))];
  return (
    <>
      {itemsPerYear.map(year => (
        <section key={year}>
          <h1 className="text-xl font-bold py-2 mt-2">{year}</h1>
          <div className="flex flex-col gap-2">
            {items
              .filter(item => item.year === year)
              .map((paper: PaperItem) => (
                <PaperItemDisplay key={uuidv4()} item={paper} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default PapersList;
