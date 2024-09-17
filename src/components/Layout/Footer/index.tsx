import React from "react";

import { appConfig } from "@/config";
import { useTranslation } from "next-i18next";
import SocialIcons from "../../SocialIcons";

const Footer = () => {
  const {
    repository,
    siteVersion,
    author: { name },
  } = appConfig;

  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-spring-wood-200 dark:bg-black text-xs">
      <div className="flex flex-col md:flex-row justify-between md:px-10 py-4 items-center container mx-auto max-w-5xl gap-6">
        <div>
          <span>© 2013 - {currentYear}</span>. <span className="font-semibold">{name}.</span>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6 text-center">
          <div>
            <SocialIcons />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a className="underline" href={repository}>
            {t("footer.currentVersion")}
            <b>{siteVersion}</b>
          </a>
          <span>
            {t("footer.license")} <a href="https://choosealicense.com/licenses/mit/">MIT License</a>.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
