import React from "react";
import Section from "@/components/Section";
import { useAppConfig } from "@/lib/config";
import { CustomBibTexEntry, getPublicationEntriesSorted } from "@/lib/content";
import styles from "@/styles/pages/academic.module.scss";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type AcademicProps = InferGetStaticPropsType<typeof getStaticProps>;

const AcademicPage: NextPage<AcademicProps> = ({ papers }: AcademicProps) => {
  const { t } = useTranslation("academic");
  const {
    author: { researchGate, googleScholar, orcid, lattes, academicEmail },
  } = useAppConfig();
  return (
    <>
      <h1>🎓 Academic</h1>
      <p>
        <Translation
          i18nKey="academic.teaching.intro"
          t={t}
          components={[<strong key={"se"} />, <strong key={"stq"} />, <strong key={"dp"} />]}
        ></Translation>
      </p>
      <Section>Publications</Section>
      <p>
        <Translation
          i18nKey="academic.researching.intro"
          t={t}
          components={[<strong key={"se"} />, <strong key={"stq"} />, <strong key={"dp"} />]}
        ></Translation>{" "}
        <Translation
          i18nKey="academic.researching.groups"
          t={t}
          components={{
            gpes: <a title="Link for GPES website" href="https://gpes.github.io/" />,
            researchGate: (
              <a title="Link for ResearchGate" href={`https://www.researchgate.net/profile/${researchGate}`} />
            ),
            scholar: (
              <a
                title="Link for Google Scholar"
                href={`https://scholar.google.com.br/citations?hl=pt-BR&user=${googleScholar}`}
              />
            ),
            orcid: <a title="Link for Orcid" href={`https://orcid.org/${orcid}`} />,
            lattes: <a title="Link for Lattes" href={`https://lattes.cnpq.br/${lattes}`} />,
          }}
        ></Translation>
      </p>
      <p>
        <Translation
          i18nKey="academic.researching.list"
          t={t}
          components={{
            email: <a title="Email link for academic purposes" href={`mailto:${academicEmail}`} />,
          }}
        ></Translation>
      </p>
      <div className={styles.papers}>
        {papers.map((paper: CustomBibTexEntry) => (
          <details key={paper.id} className={styles.paperElement}>
            <summary className={styles.paperTitle}>
              <h2>{paper.title}</h2>
              <time>{paper.year}</time>
            </summary>
            <p>{paper.abstract}</p>
            <div className={styles.paperDetails}>
              <span className={styles.paperAuthor}>{paper.author.join(", ")}</span>
              {/* TODO: Change it to button */}
              <a title="Download" href={paper.url} target="_blank" rel="noreferrer">
                <span>Download</span> <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          </details>
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const bibTexEntries = getPublicationEntriesSorted();
  return {
    props: {
      papers: bibTexEntries,
      ...(await serverSideTranslations(locale || "en", ["academic"])),
    },
  };
};

export default AcademicPage;
