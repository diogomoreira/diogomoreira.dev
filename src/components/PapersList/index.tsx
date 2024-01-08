import { PaperItem } from "@/lib/content";
import React from "react";
import PaperItemDisplay from "../PaperItemDisplay";
import { v4 as uuidv4 } from "uuid";

type PapersListProps = {
  items: PaperItem[];
};

const PapersList: React.FC<PapersListProps> = ({ items }: PapersListProps) => {
  const itemsPerYear = [...new Set(items.map(item => item.year))];
  return (
    <>
      {itemsPerYear.map(year => (
        <div key={year}>
          <h3 className="font-bold text-xl py-4">{year}</h3>
          <div className="flex flex-col gap-2">
            {items
              .filter(item => item.year === year)
              .map((paper: PaperItem) => (
                <PaperItemDisplay key={uuidv4()} item={paper} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PapersList;
