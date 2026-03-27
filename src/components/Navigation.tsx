import { appConfig } from "@/config/app.config";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import ThemeController from "./ThemeController";

const Navigation = () => {
  const { menu } = appConfig;
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="drawer bg-base-300">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar max-w-5xl px-4 md:p-10 md:py-4 container mx-auto">
          <div className="navbar-start">
            {/* Hamburger button for mobile */}
            <label htmlFor="nav-drawer" className="btn btn-square btn-ghost lg:hidden mr-2 drawer-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {menu.map(item => {
                const isActive = router.pathname === item.link;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className={`${isActive ? "menu-active" : ""} lowercase font-[Hubot_Sans] font-semibold`}
                      tabIndex={0}
                    >
                      {t(item.name)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="navbar-end">
            <ThemeController />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
          {menu.map(item => {
            const isActive = router.pathname === item.link;
            return (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`${isActive ? "menu-active" : ""} lowercase font-[Hubot_Sans] font-semibold`}
                  tabIndex={0}
                >
                  {t(item.name)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
