import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import NotesList from "@/components/NotesList";
import Section from "@/components/Section";
import { useAppConfig } from "@/lib/config";
import { NoteItem, getAllNotes } from "@/lib/content";
import styles from "@/styles/pages/index.module.scss";
import { compareDesc } from "date-fns";
import { Content } from "@/components/Layout/Content";

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ notes }: IndexPageProps) => {
  const { author, title, description } = useAppConfig();
  const { t } = useTranslation("index");

  return (
    <Content>
      <NextSeo title="Home Page" description={description} />
      <div className={styles.container}>
        <div>
          <Image src={author.image} width={175} height={175} alt={title} />
        </div>
        <div>
          <h1>
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2>
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
          <p>
            Read <Link href={"/about"}>more about me</Link>
          </p>
        </div>
      </div>
      <div>
        <p>
          <Translation
            t={t}
            i18nKey="presentation"
            components={{
              bold: <strong key={"bold"} />,
              dgarden: <Link href={"/notes"} />,
            }}
          ></Translation>
        </p>
      </div>
      <Section>Recent updates</Section>
      <div className={styles.notes}>
        <div>
          <NotesList notes={notes} />
        </div>
        <div>
          <Link href={"/notes"}>See more +</Link>
        </div>
      </div>
    </Content>
  );
};

export const getStaticProps: GetStaticProps<{ notes: NoteItem[] }> = async ({ locale }) => {
  const latest5notes: NoteItem[] = (await getAllNotes()).sort((noteA, noteB) =>
    compareDesc(new Date(noteA.timestamp), new Date(noteB.timestamp)),
  );

  return {
    props: {
      notes: latest5notes.splice(0, 5),
      ...(await serverSideTranslations(locale || "en", ["index"])),
    },
  };
};

export default IndexPage;
