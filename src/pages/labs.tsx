import React from "react";
import { ProjectItem, getProjects } from "@/lib/content";
import { ThreeColumnsMaxBreakpoints } from "@/utils/masonry.columns";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectsList from "@/components/ProjectsList";
import { Content } from "@/components/Layout/Content";
import { useTranslation } from "next-i18next";

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
    <Content>
      <NextSeo title="Labs" description="Some projects i've been working on" />
      <h1>💻 {t("title")}</h1>
      <p>{t("intro")}</p>
      <ResponsiveMasonry columnsCountBreakPoints={ThreeColumnsMaxBreakpoints}>
        <Masonry gutter="1rem">
          <ProjectsList items={items} />
        </Masonry>
      </ResponsiveMasonry>
    </Content>
  );
};

export default LabsPage;
