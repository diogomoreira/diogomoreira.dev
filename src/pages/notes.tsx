import React from "react";
import NotesList from "@/components/NotesList";
import { NoteItem, getAllNotes } from "@/lib/content";
import styles from "@/styles/pages/notes.module.scss";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type NotesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const NotesPage: NextPage<NotesPageProps> = ({ notes }: NotesPageProps) => {
  return (
    <>
      <h1>🪴 Notes</h1>
      <p>
        First: this is digital garden. Is a type of blog that is structured around the concept of organic growth and
        interconnectedness of ideas (here, we&apos;ll call them <strong>notes</strong>). Unlike traditional blogs that
        follow a linear chronological order, digital gardens allow the author to cultivate a collection of ideas that
        evolve and grow over time.
      </p>
      <div className={styles.contentContainer}>
        <NotesList notes={notes} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  notes: NoteItem[];
}> = async ({ locale }) => {
  const notes = getAllNotes();
  return {
    props: {
      notes,
      ...(await serverSideTranslations(locale || "en", ["index"])),
    },
  };
};

export default NotesPage;
