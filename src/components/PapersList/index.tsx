import { PaperItem } from "@/lib/content";
import React from "react";
import PaperItemDisplay from "../PaperItemDisplay";
import { v4 as uuidv4 } from "uuid";

type PapersListProps = {
  items: PaperItem[];
};

const PapersList: React.FC<PapersListProps> = ({ items }: PapersListProps) => {
  return (
    <>
      {items.map((paper: PaperItem) => (
        <PaperItemDisplay key={uuidv4()} item={paper} />
      ))}
    </>
  );
};

export default PapersList;
