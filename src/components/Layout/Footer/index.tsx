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
      <div className="flex flex-col justify-between px-10 py-4 items-center max-w-5xl container mx-auto text-sm gap-1">
        <div>
          <span>© 2013 - {currentYear}</span>. <span className="font-semibold">{name}.</span>
        </div>
        <span>
          This works is licensed under <a href="https://choosealicense.com/licenses/mit/">MIT License</a>.
        </span>
        <div>
          <p>
            {t("footer.currentVersion")} <b>{siteVersion}</b>.{" "}
            <Translation
              t={t}
              i18nKey={"footer.sourceCode"}
              components={[<a key={"source-code-repository"} href={repository} />]}
            ></Translation>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
