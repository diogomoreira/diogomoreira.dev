import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import { useRouter } from "next/router";
import React from "react";
import Note from "../Note";

type NotesListProps = {
  notes: NoteItem[];
};

const NotesList: React.FC<NotesListProps> = ({ notes }: NotesListProps) => {
  const { locale } = useRouter();
  return (
    <ul className={styles.notesContainer}>
      {notes?.map((note) => (
        <li key={note.slug}>
          <Note note={note} />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;