import React from "react";
import NotesList from "@/components/NotesList";
import Section from "@/components/Section";
import { useAppMetadata } from "@/lib/config";
import { NoteItem, getAllNotes } from "@/lib/content";
import styles from "@/styles/pages/index.module.scss";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import Image from "next/image";
import Link from "next/link";

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ notes }: IndexPageProps) => {
  const { title, description } = useAppMetadata();
  const { t } = useTranslation("index");

  return (
    <>
      <NextSeo title="Home Page" description={description} />
      <div className={styles.container}>
        <div>
          <Image src={"/images/profile.jpg"} width={175} height={175} alt={title} />
        </div>
        <div>
          <h1>
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2>
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
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
      <NotesList notes={notes} />
    </>
  );
};

export const getStaticProps: GetStaticProps<{ notes: NoteItem[] }> = async ({ locale }) => {
  const latest5notes = getAllNotes().splice(0, 5);
  return {
    props: {
      notes: latest5notes,
      ...(await serverSideTranslations(locale || "en", ["index"])),
    },
  };
};

export default IndexPage;
