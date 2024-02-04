import React, { useRef, useState } from "react";
import { useAppConfig } from "@/config";
import Link from "next/link";

import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import ThemeToggler from "@/components/ThemeToggle";
import Logo from "../Logo";

const Navigation = () => {
  const { menu } = useAppConfig();
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLUListElement | null>(null);

  const toggleMenu = () => {
    menuRef?.current?.classList?.toggle("hidden");
    setShowMenu(!showMenu);
  };

  return (
    <nav id="site-nav">
      <div id="site-logo">
        <Logo />
        <div id="togglers">
          <ThemeToggler />
          <button
            type="button"
            title="Show Menu"
            onKeyDown={() => toggleMenu()}
            onClick={() => toggleMenu()}
            id="toggle-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              id="hamburger-menu-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <ul ref={menuRef} role="menu" id="items-menu" className="hidden">
        {menu.map(item => (
          <li key={uuidv4()} role="listitem" onKeyDown={() => toggleMenu()} onClick={() => toggleMenu()}>
            <Link href={item.link} locale={item.locale}>
              {" "}
              {t(item.name)}
            </Link>
          </li>
        ))}
        <li id="item-menu-toggler" key={uuidv4()} role="listitem">
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
