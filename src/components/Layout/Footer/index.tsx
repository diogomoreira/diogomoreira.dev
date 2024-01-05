import { useAppConfig } from "@/config";
import styles from "@/styles/components/footer.module.scss";
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
    <footer className={styles.footerContainer}>
      <div className={styles.footerItems}>
        <div>
          Copyright © 2013 - {currentYear}. {name}
        </div>
        <div>
          {t("footer.currentVersion")} <b>{siteVersion}</b>.{" "}
          <Translation
            t={t}
            i18nKey={"footer.sourceCode"}
            components={[<a key={"source-code-repository"} href={repository} />]}
          ></Translation>
          .
        </div>
      </div>
    </footer>
  );
};

export default Footer;
