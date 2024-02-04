import { useAppConfig, useLocaleConfig } from "@/config";
import { Trans as Translation, useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Footer = () => {
  const {
    repository,
    siteVersion,
    author: { name },
  } = useAppConfig();
  const locales = useLocaleConfig();

  const router = useRouter();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>
        <div>
          <span>© 2013 - {currentYear}</span>. <span className="footer-author-name">{name}.</span>
        </div>

        <div className="footer-meta">
          <div>
            <a className="footer-source-code" href={repository}>
              {t("footer.currentVersion")}
              <b>{siteVersion}</b>
            </a>
          </div>
          <div>
            <Link
              className="language-toggler-link"
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
            </Link>
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
