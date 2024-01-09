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
      <div className="flex flex-col md:flex-row justify-between px-10 py-4 items-center max-w-5xl container mx-auto text-sm">
        <div>
          <span>© 2013 - {currentYear}</span>. <span className="font-semibold">{name}</span>.{" "}
          <span>All rights reserved.</span>
        </div>
        <div>
          {t("footer.currentVersion")} <b>{siteVersion}</b>.{" "}
          <Translation
            t={t}
            i18nKey={"footer.sourceCode"}
            components={[<a className="underline" key={"source-code-repository"} href={repository} />]}
          ></Translation>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
