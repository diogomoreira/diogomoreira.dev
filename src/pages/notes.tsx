import React from "react";
import NotesList from "@/components/NotesList";
import { NoteItem, getAllNotes } from "@/lib/content";
import styles from "@/styles/pages/notes.module.scss";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { compareDesc } from "date-fns";
import { Content } from "@/components/Layout/Content";

type NotesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const NotesPage: NextPage<NotesPageProps> = ({ notes }: NotesPageProps) => {
  return (
    <Content>
      <h1>🪴 Notes</h1>
      <p>
        <b>First</b>: this is digital garden. Is a type of blog that is structured around the concept of organic growth
        and interconnectedness of ideas (here, we&apos;ll call them <strong>notes</strong>). Unlike traditional blogs
        that follow a linear chronological order, digital gardens allow the author to cultivate a collection of ideas
        that evolve and grow over time.
      </p>
      <p>
        Most of the notes here will be written in Portuguese (Brazil) from the start and then translated to English.
        Feel free to{" "}
        <a
          href="https://github.com/diogomoreira/diogodmoreira.com/tree/main/src/content/notes"
          title="Notes folders on this website repo"
        >
          help me translate
        </a>{" "}
        some notes if you wish.
      </p>
      <div className={styles.contentContainer}>
        <NotesList notes={notes} />
      </div>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<{
  notes: NoteItem[];
}> = async ({ locale }) => {
  const notes = (await getAllNotes()).sort((noteA, noteB) =>
    compareDesc(new Date(noteA.timestamp), new Date(noteB.timestamp)),
  );
  return {
    props: {
      notes,
      ...(await serverSideTranslations(locale || "en", ["index"])),
    },
  };
};

export default NotesPage;
