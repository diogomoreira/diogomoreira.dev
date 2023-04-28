import { PaperItem } from "@/lib/content";
import React from "react";
import styles from "@/styles/components/paperitem.module.scss";

type PaperItemDisplayProps = {
  item: PaperItem;
};

const PaperItemDisplay: React.FC<PaperItemDisplayProps> = ({ item }: PaperItemDisplayProps) => {
  return (
    <details key={item.id} className={styles.paperElement}>
      <summary className={styles.paperTitle}>
        <h2>{item.title}</h2>
        <time>{item.year}</time>
      </summary>
      <p>{item.abstract}</p>
      <div className={styles.paperDetails}>
        <span className={styles.paperAuthor}>{item.author.join(", ")}</span>
        <button>Download</button>
      </div>
    </details>
  );
};

export default PaperItemDisplay;
