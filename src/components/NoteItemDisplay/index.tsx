import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
type NoteProps = { note: NoteItem };

const NoteItemDisplay: React.FC<NoteProps> = ({ note }: NoteProps) => {
  const { locale } = useRouter();
  return (
    <article className={styles.note}>
      <Link href={`/${note.slug}`}>
        <div className={styles.noteItem}>
          <h1>{note.title}</h1>
          <time>{formatDateI18N(note.timestamp, locale)}</time>
        </div>
      </Link>
    </article>
  );
};

export default NoteItemDisplay;
