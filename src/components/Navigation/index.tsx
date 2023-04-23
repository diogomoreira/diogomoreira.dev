import { useAppMetadata } from "@/lib/config";
import Link from "next/link";

import styles from "@/styles/components/navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Navigation = () => {
  const { menu } = useAppMetadata();
  const title = "diogodmoreira.com";
  return (
    <nav className={styles.navigationContainer}>
      <Link className={styles.navigationLogo} href={"/"}>
        <Image src={"/images/logo.png"} width={40} height={40} alt={"Logo"} />
        <div>{title}</div>
      </Link>
      <ul className={styles.navigationListItem}>
        {menu.map((item, index) => (
          <li key={index}>
            <Link className={styles.navigationListItemLink} href={item.link}>
              <FontAwesomeIcon icon={item.icon} />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
