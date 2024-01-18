import React, { useRef, useState } from "react";
import { useAppConfig } from "@/config";
import Link from "next/link";

import { v4 as uuidv4 } from "uuid";
// import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ThemeToggler from "@/components/ThemeToggle";
import Logo from "../Logo";
import LanguageToggle from "@/components/LanguageToggle";

const Navigation = () => {
  const { menu } = useAppConfig();
  // const locales = useLocaleConfig();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  // const router = useRouter();

  const menuRef = useRef<HTMLUListElement | null>(null);

  // const changeLanguageHandler = async (lang: string) => {
  //   await router
  //     .push(router.route, router.route, { locale: lang })
  //     .then(() => router.reload())
  //     .then(() => setShowMenu(false));
  // };

  const toggleMenu = () => {
    menuRef?.current?.classList?.toggle("hidden");
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between md:p-6 items-center max-w-5xl container mx-auto border-b border-slate-200 dark:border-slate-600">
        <div className="flex flex-1 w-full justify-between">
          <Logo />
          <div className="flex md:hidden">
            <ThemeToggler />
            <button
              type="button"
              title="Show Menu"
              onKeyDown={() => toggleMenu()}
              onClick={() => toggleMenu()}
              className="p-4 block md:hidden active:bg-slate-200 dark:active:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rounded-full"
                id="hamburger-menu-icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        <ul
          ref={menuRef}
          role="menu"
          className="hidden md:flex bg-slate-200 dark:bg-slate-800 dark:md:bg-transparent md:bg-transparent w-full md:w-auto flex-col md:flex-row md:items-center md:gap-6"
        >
          {menu.map(item => (
            <li
              key={uuidv4()}
              role="listitem"
              onKeyDown={() => toggleMenu()}
              onClick={() => toggleMenu()}
              className="px-6 py-2 active:bg-slate-300 dark:active:bg-slate-900 md:active:bg-transparent dark:md:active:bg-transparent md:p-0 font-semibold lowercase md:bg-transparent text-left"
            >
              <Link href={item.link}> {t(item.name)}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex">
          <ThemeToggler />
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
