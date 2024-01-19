import { PaperItem } from "@/lib/content";
import React from "react";
import { ExternalLinkButton } from "../Button";

type PaperItemDisplayProps = {
  item: PaperItem;
};

const PaperItemDisplay: React.FC<PaperItemDisplayProps> = ({ item }: PaperItemDisplayProps) => {
  return (
    <details className="paper-details" key={item.id}>
      <summary className="paper-summary">{item.title}</summary>
      <div className="paper-media">{item.media}</div>
      <p className="paper-abstract">{item.abstract}</p>
      <div className="paper-meta">
        <span>{item.author.join(", ")}</span>
        <ExternalLinkButton href={`https://www.doi.org/${item.doi}`}>Download</ExternalLinkButton>
      </div>
    </details>
  );
};

export default PaperItemDisplay;
