import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import { capitalize } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type NoteProps = { note: NoteItem };

const Note: React.FC<NoteProps> = ({ note }: NoteProps) => {
  const { locale } = useRouter();
  return (
    <article className={styles.note}>
      {note.cover && (
        <div className={styles.noteItemCover}>
          <Image src={`/images/notes/cover/${note.cover}`} alt={note.title} fill sizes="400px" />
        </div>
      )}
      <div className={styles.noteItem}>
        <Link href={`notes/${note.slug}`}>
          <h1>{note.title}</h1>
        </Link>
        <div className={styles.noteDetails}>
          <span>{capitalize(note.category)}</span>
          <time>{formatDateI18N(note.timestamp, locale)}</time>
        </div>
        <p className={styles.noteDescription}>{note.description}</p>
      </div>
    </article>
  );
};

export default Note;
