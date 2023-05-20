import React, { useState } from "react";
import { useAppConfig } from "@/lib/config";
import Link from "next/link";

import styles from "@/styles/components/navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const { menu } = useAppConfig();
  const title = "{ diogomoreira }";
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles.navigationLayoutContainer}>
      <nav className={styles.navigationContainer}>
        <div className={styles.navigationLogoContainer}>
          <Link className={styles.navigationLogo} href={"/"}>
            <Image src={"/images/logo.png"} width={40} height={40} alt={"Logo"} />
            <div>{title}</div>
          </Link>
          <div className={styles.menuToggle}>
            <FontAwesomeIcon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
          </div>
        </div>
        <ul className={styles.navigationListItem} hidden={!showMenu}>
          {menu.map(item => (
            <li key={uuidv4()}>
              <Link className={styles.navigationListItemLink} href={item.link} onClick={() => setShowMenu(false)}>
                <FontAwesomeIcon className={styles.navigationListItemIcon} icon={item.icon} />
                <span className={styles.navigationListItemLabel}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
