import React, { useRef, useState } from "react";
import { useAppConfig, useLocaleConfig } from "@/config";
import Link from "next/link";

import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import ThemeToggler from "@/components/ThemeToggle";

const Navigation = () => {
  const { menu } = useAppConfig();
  const locales = useLocaleConfig();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const menuRef = useRef(null);

  const changeLanguageHandler = async (lang: string) => {
    await router
      .push(router.route, router.route, { locale: lang })
      .then(() => router.reload())
      .then(() => setShowMenu(false));
  };

  const toggleMenu = () => {
    menuRef?.current?.classList?.toggle("hidden");
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between md:p-6 items-center max-w-5xl container mx-auto border-b border-slate-200 dark:border-slate-600">
        <div className="flex flex-1 w-full justify-between">
          <h1 className="text-xl p-6 md:p-0 flex gap-x-2 items-center tracking-tight font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
            <div>
              <span className="font-medium">diogo</span>
              <span className="font-light">dmoreira</span>
              <span className="font-medium">.com</span>
            </div>
          </h1>
          <div className="flex md:hidden">
            <ThemeToggler />
            <button
              type="button"
              title="Show Menu"
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
              onClick={() => toggleMenu()}
              className="px-6 py-2 active:bg-slate-300 dark:active:bg-slate-900 md:active:bg-transparent dark:md:active:bg-transparent md:p-0 font-semibold lowercase md:bg-transparent text-left"
            >
              <Link href={item.link}> {t(item.name)}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
