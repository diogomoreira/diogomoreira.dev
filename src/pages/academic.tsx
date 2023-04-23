import Section from "@/components/Section";
import { getPublicationEntriesSorted } from "@/lib/content";
import styles from "@/styles/pages/academic.module.scss";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type AcademicProps = InferGetStaticPropsType<typeof getStaticProps>;

const AcademicPage: NextPage<AcademicProps> = ({ papers }) => {
  const { t } = useTranslation("academic");

  return (
    <>
      <h1>🎓 Academic</h1>
      <p>
        <Translation
          i18nKey="academic.teaching.intro"
          t={t}
          components={[
            <strong key={"se"} />,
            <strong key={"stq"} />,
            <strong key={"dp"} />,
          ]}
        ></Translation>
      </p>
      <Section>Publications</Section>
      <p>
        <Translation
          i18nKey="academic.researching.intro"
          t={t}
          components={[
            <strong key={"se"} />,
            <strong key={"stq"} />,
            <strong key={"dp"} />,
          ]}
        ></Translation>{" "}
        <Translation
          i18nKey="academic.researching.groups"
          t={t}
          components={{
            gpes: <a title="Link for Gpes" href="https://gpes.github.io/" />,
            researchGate: (
              <a
                title="Link for ResearchGate"
                href="https://www.researchgate.net/profile/Diogo_Moreira4"
              />
            ),
            scholar: (
              <a
                title="Link for Google Scholar"
                href="https://scholar.google.com.br/citations?hl=pt-BR&user=DlSdlvEAAAAJ"
              />
            ),
            orcid: (
              <a
                title="Link for Orcid"
                href="https://orcid.org/0000-0003-1803-6565"
              />
            ),
            lattes: (
              <a
                title="Link for Lattes"
                href="http://lattes.cnpq.br/2745996619940977"
              />
            ),
          }}
        ></Translation>
      </p>
      <p>
        <Translation
          i18nKey="academic.researching.list"
          t={t}
          components={{
            email: (
              <a
                title="Email link for academic purposes"
                href="mailto:diogo.moreira@ifpb.edu.br"
              />
            ),
          }}
        ></Translation>
      </p>
      <div className={styles.papers}>
        {papers.map((paper) => (
          <details key={paper.id} className={styles.paperElement}>
            <summary className={styles.paperTitle}>
              <h2>{paper.title}</h2>
              <time>{paper.year}</time>
            </summary>
            <p>{paper.abstract}</p>
            <div className={styles.paperDetails}>
              <span className={styles.paperAuthor}>
                {paper.author.join(", ")}
              </span>
              {/* TODO: Change it to button */}
              <a
                title="Download"
                href={paper.url}
                target="_blank"
                rel="noreferrer"
              >
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
      ...(await serverSideTranslations(locale, ["academic"])),
      papers: bibTexEntries,
    },
  };
};

export default AcademicPage;
