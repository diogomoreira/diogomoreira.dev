import React from "react";

import PageTitle from "@/components/PageTitle";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { getProjects } from "@/lib/content/projects";
import { Project } from "@/models/project.model";
import { ProjectsList } from "@/components/Projects";

type ProjectsPageStaticProps = { items: Project[] };

export const getStaticProps: GetStaticProps<ProjectsPageStaticProps> = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  const items = getProjects();
  return {
    props: {
      items,
      ...(await serverSideTranslations(currentLocale, ["projects", "common"])),
    },
  };
};

type ProjectsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectsPage: NextPage<ProjectsPageProps> = ({ items }: Readonly<ProjectsPageProps>) => {
  const { t } = useTranslation("projects");
  return (
    <>
      <NextSeo title="Projects" description="Some projects i've been working on" />
      <PageTitle>{t("title")}</PageTitle>
      <p>{t("intro")}</p>
      <ProjectsList items={items} />
    </>
  );
};

export default ProjectsPage;
