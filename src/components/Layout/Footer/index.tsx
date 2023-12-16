import { useAppConfig } from "@/config";
import styles from "@/styles/components/footer.module.scss";
import { Trans as Translation, useTranslation } from "next-i18next";
import React from "react";
import SocialIcons from "./SocialIcons";

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
        <div className={styles.footerInfo}>
          <div>
            Copyright © 2013 - {currentYear}. {name}
          </div>
          <div>
            <Translation
              t={t}
              i18nKey={"footer.sourceCode"}
              components={[<a key={"source-code-repository"} href={repository} />]}
            ></Translation>
            . {t("footer.currentVersion")} <b>{siteVersion}</b>
          </div>
        </div>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
