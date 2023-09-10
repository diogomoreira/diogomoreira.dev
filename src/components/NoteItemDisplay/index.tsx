import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import Link from "next/link";
import React from "react";
type NoteProps = { note: NoteItem };

const NoteItemDisplay: React.FC<NoteProps> = ({ note }: NoteProps) => {
  return (
    <article className={styles.note}>
      <Link href={`/${note.slug}`}>
        <div className={styles.noteItem}>
          <time>{formatDateI18N(note.timestamp)}</time>
          <h1>{note.title}</h1>
        </div>
      </Link>
    </article>
  );
};

export default NoteItemDisplay;
