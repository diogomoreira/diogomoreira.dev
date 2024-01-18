import React from "react";
import { ProjectItem, getProjects } from "@/lib/content";
import { ThreeColumnsMaxBreakpoints } from "@/utils/masonry.columns";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectsList from "@/components/ProjectsList";
import { useTranslation } from "next-i18next";
import PageTitle from "@/components/PageTitle";
import PageDescription from "@/components/PageDescription";

export const getStaticProps: GetStaticProps<{ items: ProjectItem[] }> = async ({ locale }) => {
  const currentLocale = locale || "en";
  const items = getProjects(currentLocale);
  return {
    props: {
      items,
      ...(await serverSideTranslations(currentLocale, ["labs", "common"])),
    },
  };
};

type LabsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const LabsPage: NextPage<LabsPageProps> = ({ items }: LabsPageProps) => {
  const { t } = useTranslation("labs");
  return (
    <>
      <NextSeo title="Labs" description="Some projects i've been working on" />
      <PageTitle>💻 {t("title")}</PageTitle>
      <PageDescription>{t("intro")}</PageDescription>
      <ResponsiveMasonry columnsCountBreakPoints={ThreeColumnsMaxBreakpoints}>
        <Masonry gutter="1rem">
          <ProjectsList items={items} />
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default LabsPage;
