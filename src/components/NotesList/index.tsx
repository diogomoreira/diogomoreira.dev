import React from "react";
import { NoteItem } from "@/lib/content";
import styles from "@/styles/components/noteslist.module.scss";
import NoteItemDisplay from "../NoteItemDisplay";
import EmptyState, { EmptyContentType } from "../EmptyState";

type NotesListProps = {
  notes: NoteItem[];
};

const NotesList: React.FC<NotesListProps> = ({ notes }: NotesListProps) => {
  return (
    <>
      {notes.length > 0 ? (
        <ul className={styles.notesContainer}>
          {notes?.map(note => (
            <li key={note.slug} className={styles.noteItemContainer}>
              <NoteItemDisplay note={note} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState type={EmptyContentType.NOTES} />
      )}
    </>
  );
};

export default NotesList;
