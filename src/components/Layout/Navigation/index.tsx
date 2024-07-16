import React from "react";

import { appConfig } from "@/config";
import Link from "next/link";
import { useRef, useState } from "react";

import ThemeToggler from "@/components/ThemeToggle";
import { useTranslation } from "next-i18next";
import { v4 as uuidv4 } from "uuid";
import Logo from "../Logo";

const Navigation = () => {
  const { menu } = appConfig;
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLUListElement | null>(null);

  const toggleMenu = () => {
    menuRef?.current?.classList?.toggle("hidden");
    setShowMenu(!showMenu);
  };

  return (
    <nav
      id="site-nav"
      className="flex flex-col md:flex-row justify-between md:py-4 items-center max-w-5xl container mx-auto border-b border-spring-wood-200 dark:border-neutral-800"
    >
      <div id="site-logo" className="px-6 py-6 md:py-0 flex flex-1 w-full justify-between">
        <Logo />
        <div id="togglers" className="flex gap-2 md:hidden">
          <ThemeToggler />
          <button
            type="button"
            title="Show Menu"
            onKeyDown={() => toggleMenu()}
            onClick={() => toggleMenu()}
            id="toggle-menu"
            className="block md:hidden rounded-md active:bg-spring-wood-200 dark:active:bg-spring-wood-800"
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
        id="items-menu"
        className="hidden md:px-6 md:flex bg-spring-wood-200 dark:bg-neutral-900 dark:md:bg-transparent md:bg-transparent w-full md:w-auto flex-col md:flex-row md:items-center md:gap-2"
      >
        {menu.map(item => (
          <li
            key={uuidv4()}
            role="listitem"
            onKeyDown={() => toggleMenu()}
            onClick={() => toggleMenu()}
            className="px-6 py-3 border-b border-b-spring-wood-300 dark:border-b-neutral-800 active:bg-spring-wood-300 dark:active:bg-neutral-900 md:active:bg-transparent dark:md:active:bg-transparent md:p-2 md:border-0 font-normal tracking-tighter lowercase md:bg-transparent text-left hover:underline"
          >
            <Link href={item.link} locale={item.locale}>
              {" "}
              {t(item.name)}
            </Link>
          </li>
        ))}
        <li id="item-menu-toggler" key={uuidv4()} role="listitem" className="hidden md:flex">
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
