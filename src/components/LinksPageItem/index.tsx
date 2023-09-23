import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "@/styles/components/linkitem.module.scss";

type LinksPageItemProps = {
  icon: string;
  description: string;
  href: string;
};

const LinksPageItem: React.FC<LinksPageItemProps> = ({ icon, description, href }: LinksPageItemProps) => {
  return (
    <a href={href}>
      <button className={styles.linkContainer}>
        <span>{icon}</span>
        <span>{description}</span>
      </button>
    </a>
  );
};

export default LinksPageItem;
