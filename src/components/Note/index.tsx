import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { v4 as uuidv4 } from "uuid";
type NoteProps = { note: NoteItem };

const Note: React.FC<NoteProps> = ({ note }: NoteProps) => {
  const { locale } = useRouter();
  const { tags } = note;
  return (
    <article className={styles.note}>
      <div className={styles.noteItem}>
        <time>{formatDateI18N(note.timestamp, locale)}</time>
        <Link href={`notes/${note.slug}`}>
          <h1>{note.title}</h1>
        </Link>
        <div className={styles.noteDetails}>
          <span>{capitalize(note.category)}</span>
          <div className={styles.noteTags}>
            {tags.map((tag: string) => (
              <span key={uuidv4()}>{tag}</span>
            ))}
          </div>
        </div>
        <p className={styles.noteDescription}>{note.description}</p>
        <div>
          <Link href={`notes/${note.slug}`}>Read the article ▶︎</Link>
        </div>
      </div>
    </article>
  );
};

export default Note;
