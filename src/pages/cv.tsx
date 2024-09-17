import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { getWorkExperience, getEducation } from "../lib/content/about";
import { Education } from "../models/education.model";
import { Work } from "../models/work.model";
import { Trans as Translation, useTranslation } from "next-i18next";
import { differenceInYears } from "date-fns";
import CVItemContainer from "../components/about/CVItemContainer";
import EducationItem from "../components/about/EducationItem";
import WorkItem from "../components/about/WorkItem";
import PageSection from "../components/PageSection";
import { generateUUID } from "../utils/uuid";
import PageTitle from "../components/PageTitle";
import { NextSeo } from "next-seo";

type CVPageStaticProps = { experience: Work[]; education: Education[] };

export const getStaticProps: GetStaticProps<CVPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  return {
    props: {
      experience: getWorkExperience(),
      education: getEducation(),
      ...(await serverSideTranslations(currentLocale, ["cv", "common"])),
    },
  };
};

type CVPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CVPage({ experience, education }: Readonly<CVPageProps>) {
  const { t } = useTranslation("cv");
  const experienceInYears = differenceInYears(new Date(), new Date("2012-07-02"));
  return (
    <>
      <NextSeo title="Curriculum" description="My professional profile" />
      <PageTitle>Curriculum</PageTitle>
      <p>
        <Translation
          t={t}
          i18nKey="summary"
          components={{ strong: <strong /> }}
          values={{ experience: experienceInYears }}
        />
      </p>
      <p>
        <Translation t={t} i18nKey="education" components={{ strong: <strong /> }} />
      </p>
      <PageSection>Work Experience</PageSection>
      <CVItemContainer>
        {experience.map(workXP => (
          <WorkItem key={generateUUID()} item={workXP} />
        ))}
      </CVItemContainer>
      <PageSection>Education</PageSection>
      <CVItemContainer>
        {education.map(edu => (
          <EducationItem key={generateUUID()} item={edu} />
        ))}
      </CVItemContainer>
    </>
  );
}
