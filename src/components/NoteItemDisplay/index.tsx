import { ContentPath, NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type NoteProps = { note: NoteItem };

const NoteItemDisplay: React.FC<NoteProps> = ({ note }: NoteProps) => {
  return (
    <article className={styles.note}>
      <div className={styles.cover}>
        <Image
          src={`${ContentPath.NOTES_COVER_IMAGES}/${note.cover}`}
          fill
          alt={note.title}
          sizes="33vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>
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
