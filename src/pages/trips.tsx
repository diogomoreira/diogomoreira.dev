import { ContentFluid } from "@/components/Layout/Content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

type TripsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const TripsPage: NextPage = () => {
  return (
    <ContentFluid>
      <h1>🗺️ Trips</h1>
      <p>Work in progress...</p>
    </ContentFluid>
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
