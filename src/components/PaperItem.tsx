import { Paper } from "@/models/paper.model";
import React from "react";
import Button from "./ui/Button";

type PaperItemProps = {
  item: Paper;
};

const PaperItem: React.FC<PaperItemProps> = ({ item }: PaperItemProps) => {
  return (
    <div className="collapse collapse-arrow bg-base-200 border border-base-300" key={item.id}>
      <input type="radio" name="paper-accordion" title="Expand/Collapse Paper Details" />
      <div className="collapse-title font-semibold">
        <span>{item.title}</span>
      </div>
      <div className="collapse-content text-sm">
        <div>{item.media}</div>
        <p className="text-sm leading-relaxed my-0">{item.abstract}</p>
        <div className="flex items-center justify-between text-sm">
          <span>
            <strong>Authors</strong>: {item.author.join(", ")}
          </span>
          <Button>
            <a href={`https://www.doi.org/${item.doi}`} target="_blank" rel="noreferrer">
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaperItem;
