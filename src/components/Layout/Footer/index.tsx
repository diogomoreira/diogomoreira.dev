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
    <footer>
      <div>
        <div>
          <span>© 2013 - {currentYear}</span>. <span className="footer-author-name">{name}.</span>
        </div>
        <div>
          This works is licensed under <a href="https://choosealicense.com/licenses/mit/">MIT License</a>.
        </div>
        <div>
          {t("footer.currentVersion")} <b>{siteVersion}</b>.{" "}
          <Translation
            t={t}
            i18nKey={"footer.sourceCode"}
            components={[<a className="footer-source-code" key={"source-code-repository"} href={repository} />]}
          ></Translation>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
