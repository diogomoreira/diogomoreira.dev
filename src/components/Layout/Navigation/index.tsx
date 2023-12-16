import React, { useState } from "react";
import { useAppConfig, useLocaleConfig } from "@/config";
import Link from "next/link";

import styles from "@/styles/components/navigation.module.scss";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Navigation = () => {
  const { menu } = useAppConfig();
  const locales = useLocaleConfig();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const changeLanguageHandler = async (lang: string) => {
    await router
      .push(router.route, router.route, { locale: lang })
      .then(() => router.reload())
      .then(() => setShowMenu(false));
  };

  return (
    <div className={styles.navigationLayoutContainer}>
      <nav className={styles.navigationContainer}>
        <div className={styles.navigationLogoContainer}>
          <Link className={styles.navigationLogo} href={"/"}>
            <Image src={"/images/logo.png"} width={30} height={30} alt={"Logo"} />
            <div>
              <span>diogo</span>
              <span>moreira</span>
            </div>
          </Link>
          <div className={styles.menuToggle}>
            <FiMenu onClick={() => setShowMenu(!showMenu)} />
          </div>
        </div>

        <ul className={styles.navigationListItem} hidden={!showMenu}>
          {menu.map(item => {
            const MenuItemIcon = item.icon;
            return (
              <li key={uuidv4()}>
                <Link
                  className={`${styles.navigationListItemLink} ${
                    router.pathname === item.link && styles.navigationListItemCurrent
                  } `}
                  href={item.link}
                  onClick={() => setShowMenu(false)}
                  title={item.name}
                >
                  <MenuItemIcon className={styles.navigationListItemIcon} />
                  <span className={styles.navigationListItemLabel}>{t(item.name)}</span>
                </Link>
              </li>
            );
          })}
          <hr></hr>
          <li>
            <a
              className={styles.navigationListItemLink}
              href="#"
              onClick={() =>
                changeLanguageHandler(router.locale === locales.en.locale ? locales.pt.locale : locales.en.locale)
              }
            >
              <span>{router.locale === locales.en.locale ? locales.pt.icon : locales.en.icon}</span>
              <span className={styles.navigationListChangeLanguageLabel}>{t("common.changeLanguage")}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
