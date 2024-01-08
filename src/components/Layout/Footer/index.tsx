import { useAppConfig } from "@/config";
import { Trans as Translation, useTranslation } from "next-i18next";
import React from "react";

const Footer = () => {
  const {
    repository,
    siteVersion,
    author: { name },
  } = useAppConfig();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 dark:bg-slate-800">
      <div className="flex justify-between px-10 py-10 items-center max-w-5xl container mx-auto text-xs">
        <div>
          Copyright © 2013 - {currentYear}. {name}
        </div>
        <div>
          {t("footer.currentVersion")} <b>{siteVersion}</b>.{" "}
          <Translation
            t={t}
            i18nKey={"footer.sourceCode"}
            components={[<a className="underline" key={"source-code-repository"} href={repository} />]}
          ></Translation>
          .
        </div>
      </div>
    </footer>
  );
};

export default Footer;
