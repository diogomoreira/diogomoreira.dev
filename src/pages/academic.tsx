import React from "react";
import { graphql, PageProps } from "gatsby";
import ResearchItem, { ResearchItemProps } from "../components/ResearchItem";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import { PageTitle, SectionTitle } from "../styles/typography";
import { Trans, useTranslation } from "react-i18next";
import TeachingItem, { TeachingItemProps } from "../components/TeachingItem";
import Content from "../components/Content";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const AcademicToastContainer = styled(ToastContainer)`
  font-size: var(--font-size-h4);
`;

const AcademicPage = ({ data }: PageProps<Queries.AcademicReferencesQuery>) => {
  const { t } = useTranslation();

  const researchItems = data.allReference.nodes;
  const teachingItems = data.allSubjectsJson.nodes;
  return (
    <Layout>
      <SEO title="Pesquisa" pathname="research" />
      <PageTitle>Academia</PageTitle>
      <Content>
        <p>
          <Trans i18nKey="academic.teaching.intro" components={[<strong />]}></Trans>
        </p>
      </Content>
      {teachingItems.map((teachingItem, i) => (
        <TeachingItem
          key={i}
          institution={teachingItem.institution}
          semester={teachingItem.semester}
          subjects={teachingItem.subjects}></TeachingItem>
      ))}
      <SectionTitle>{t("academic.researching.title")}</SectionTitle>
      <Content>
        <p>
          <Trans i18nKey="academic.researching.intro" components={[<strong />, <strong />, <strong />]}></Trans>{" "}
          <Trans
            i18nKey="academic.researching.groups"
            components={{
              gpes: <a href="https://gpes.github.io/" />,
              researchGate: <a href="https://www.researchgate.net/profile/Diogo_Moreira4" />,
              scholar: <a href="https://scholar.google.com.br/citations?hl=pt-BR&user=DlSdlvEAAAAJ" />,
              orcid: <a href="https://orcid.org/0000-0003-1803-6565" />,
              lattes: <a href="http://lattes.cnpq.br/2745996619940977" />,
            }}></Trans>
        </p>
        <p>
          <Trans
            i18nKey="academic.researching.list"
            components={{ email: <a href="mailto:diogo.moreira@ifpb.edu.br" /> }}></Trans>
        </p>
      </Content>
      {researchItems.map((researchItem, i) => {
        return <ResearchItem key={i} researchItem={researchItem} />;
      })}
      <AcademicToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </Layout>
  );
};

export const query = graphql`
  query AcademicReferences {
    allReference(sort: { fields: year, order: DESC }) {
      nodes {
        title
        abstract
        authors
        doi
        url
        year
        journal
        booktitle
        id
        raw
      }
    }
    allSubjectsJson(sort: { fields: semester, order: DESC }) {
      nodes {
        institution
        semester
        subjects {
          link
          name
        }
      }
    }
  }
`;

export default AcademicPage;
