import LocationPicture from "@/components/LocationPicture";
import PageTitle from "@/components/PageTitle";
import { GetStaticProps } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale ?? "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["about", "common"])),
    },
  };
};

export default function AboutPage() {
  const { t } = useTranslation("about");
  return (
    <>
      <NextSeo title="About me" description="My personal profile" />
      <PageTitle>About me</PageTitle>
      <div className="prose max-w-none">
        <LocationPicture
          src={"/images/pages/about/cover.jpg"}
          width={1920}
          height={1080}
          alt="Diogo Moreira"
          location="Pavilhão Japonês, Ibirapuera Park - São Paulo - SP"
        />
        <p>
          <Translation t={t} i18nKey="intro" components={{ strong: <strong /> }} />
        </p>
        <p>
          <Translation
            t={t}
            i18nKey="hobbies"
            components={{ strong: <strong />, linkBookmarks: <Link href={"/bookmarks"} /> }}
          />
        </p>
        <p>
          <Translation t={t} i18nKey="work" components={{ linkcv: <Link href={"/cv"} /> }} />
        </p>
        <p>{t("end")}</p>
      </div>
    </>
  );
}
