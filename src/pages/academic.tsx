import React from "react";

import PageTitle from "@/components/PageTitle";
import { appConfig } from "@/config";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import PageSection from "@/components/PageSection";
import { PaperItem } from "@/components/Papers";
import { generateUUID } from "@/utils/uuid";
import { Paper } from "@/models/paper.model";
import { getPublicationEntries } from "@/lib/content/papers";

type AcademicPageStaticProps = { papers: Paper[] };

export const getStaticProps: GetStaticProps<AcademicPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const bibTexEntries = getPublicationEntries();
  return {
    props: {
      papers: bibTexEntries,
      ...(await serverSideTranslations(currentLocale, ["academic", "common"])),
    },
  };
};

type AcademicProps = InferGetStaticPropsType<typeof getStaticProps>;

const AcademicPage: NextPage<AcademicProps> = ({ papers }: AcademicProps) => {
  const { t } = useTranslation("academic");
  const {
    author: { researchGate, googleScholar, orcid, lattes, academicEmail },
  } = appConfig;
  return (
    <>
      <NextSeo title="Academic" description="My academic profile" />
      <PageTitle>{t("title")}</PageTitle>
      <p>
        <Translation
          i18nKey="teaching.intro"
          t={t}
          components={[<strong key={"se"} />, <strong key={"stq"} />, <strong key={"dp"} />]}
        ></Translation>
      </p>
      <PageSection>{t("researching.title")}</PageSection>
      <p>
        <Translation
          i18nKey="researching.intro"
          t={t}
          components={[<strong key={"se"} />, <strong key={"stq"} />, <strong key={"dp"} />]}
        ></Translation>{" "}
        <Translation
          i18nKey="researching.groups"
          t={t}
          components={{
            gpes: <a title="Link for GPES website" href="https://gpes.github.io/" />,
            researchGate: <a title="Link for ResearchGate" href={researchGate} />,
            scholar: <a title="Link for Google Scholar" href={googleScholar} />,
            orcid: <a title="Link for Orcid" href={orcid} />,
            lattes: <a title="Link for Lattes" href={lattes} />,
          }}
        ></Translation>
      </p>
      <p>
        <Translation
          i18nKey="researching.list"
          t={t}
          components={{
            email: <a title="Email link for academic purposes" href={academicEmail} />,
          }}
        ></Translation>
      </p>
      <div className="flex flex-col gap-2">
        {papers.map(item => (
          <PaperItem key={generateUUID()} item={item} />
        ))}
      </div>
    </>
  );
};

export default AcademicPage;
