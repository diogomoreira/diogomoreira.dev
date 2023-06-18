import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
type NoteProps = { note: NoteItem };

const Note: React.FC<NoteProps> = ({ note }: NoteProps) => {
  const { locale } = useRouter();
  return (
    <article className={styles.note}>
      <Link className={styles.noteItem} href={`/${note.slug}`}>
        <h1>{note.title}</h1>
        <time>{formatDateI18N(note.timestamp, locale)}</time>
      </Link>
    </article>
  );
};

export default Note;
