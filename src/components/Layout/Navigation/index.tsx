import React, { useState } from "react";
import { useAppConfig } from "@/config";
import Link from "next/link";

import styles from "@/styles/components/navigation.module.scss";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const Navigation = () => {
  const { menu } = useAppConfig();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
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
                  <span className={styles.navigationListItemLabel}>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
