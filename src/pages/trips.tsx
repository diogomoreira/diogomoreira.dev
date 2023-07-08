import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

type TripsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const TripsPage: NextPage = () => {
  return (
    <>
      <h1>🗺️ Trips</h1>
      <p>
        <b>First</b>: this is digital garden. Is a type of blog that is structured around the concept of organic growth
        and interconnectedness of ideas (here, we&apos;ll call them <strong>notes</strong>). Unlike traditional blogs
        that follow a linear chronological order, digital gardens allow the author to cultivate a collection of ideas
        that evolve and grow over time.
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps<object> = async ({ locale }) => {
  const places: never[] = [];
  return {
    props: {
      places,
      ...(await serverSideTranslations(locale || "en", ["index"])),
    },
  };
};

export default TripsPage;