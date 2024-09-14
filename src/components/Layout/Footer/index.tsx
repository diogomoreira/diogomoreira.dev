import React from "react";

import { locales, appConfig } from "@/config";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const {
    repository,
    siteVersion,
    author: { name },
  } = appConfig;

  const router = useRouter();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-spring-wood-200 dark:bg-black text-xs">
      <div className="flex flex-col md:flex-row justify-between md:px-10 py-4 items-center container mx-auto max-w-5xl">
        <div>
          <span>© 2013 - {currentYear}</span>. <span className="font-semibold">{name}.</span>
        </div>
        <div className="flex flex-col md:flex-row md:gap-6 text-center">
          <div>
            <a className="underline" href={repository}>
              {t("footer.currentVersion")}
              <b>{siteVersion}</b>
            </a>
          </div>
          <div>
            {/* <Link
              className="flex gap-6 items-center"
              href="/"
              locale={router.locale === locales.en.locale ? locales.pt.locale : locales.en.locale}
            >
              <span className="language-toggler">{t("common.changeLanguage")}</span>
              <span className="language-toggler-flag">
                {router.locale === locales.en.locale ? (
                  <span className="fi fi-br"></span>
                ) : (
                  <span className="fi fi-us"></span>
                )}
              </span>
            </Link> */}
          </div>
        </div>
        <div className="footer-meta">
          <span>
            {t("footer.license")} <a href="https://choosealicense.com/licenses/mit/">MIT License</a>.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
