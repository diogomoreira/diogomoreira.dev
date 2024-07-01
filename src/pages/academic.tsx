import PageTitle from "@/components/PageTitle";
import PapersList from "@/components/PapersList";
import { useAppConfig } from "@/config";
import { getPublicationEntriesSorted } from "@/lib/content";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

type AcademicProps = InferGetStaticPropsType<typeof getStaticProps>;

const AcademicPage: NextPage<AcademicProps> = ({ papers }: AcademicProps) => {
  const { t } = useTranslation("academic");
  const {
    author: { researchGate, googleScholar, orcid, lattes, academicEmail },
  } = useAppConfig();
  return (
    <>
      <NextSeo title="Academic" description="My academic profile" />
      <PageTitle>{t("title")}</PageTitle>
      <article className="prose max-w-none prose-gray mx-auto dark:prose-invert md:px-0 dark:prose-a:text-gray-200 prose-h1:my-6 prose-h2:my-6">
        <p>
          <Translation
            i18nKey="teaching.intro"
            t={t}
            components={[<strong key={"se"} />, <strong key={"stq"} />, <strong key={"dp"} />]}
          ></Translation>
        </p>
        <h2 className="text-2xl pb-2 my-6 tracking-tight font-bold flex justify-between border-b border-spring-wood-200 dark:border-gray-600">
          {t("researching.title")}
        </h2>
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
            i18nKey="researching.list"
            t={t}
            components={{
              email: <a title="Email link for academic purposes" href={`mailto:${academicEmail}`} />,
            }}
          ></Translation>
        </p>
      </article>
      <PapersList items={papers} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  const bibTexEntries = getPublicationEntriesSorted();
  return {
    props: {
      papers: bibTexEntries,
      ...(await serverSideTranslations(currentLocale, ["academic", "common"])),
    },
  };
};

export default AcademicPage;
