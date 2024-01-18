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
        <section key={year}>
          <h1 className="paper-year">{year}</h1>
          <div className="paper-year-list">
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
