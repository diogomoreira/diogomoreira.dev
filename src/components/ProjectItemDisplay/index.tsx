import { ProjectItem } from "@/lib/content";
import styles from "@/styles/components/labitem.module.scss";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";

type ProjectItemDisplayProps = {
  item: ProjectItem;
};

const ProjectItemDisplay: React.FC<ProjectItemDisplayProps> = ({ item }: ProjectItemDisplayProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.labItemContainer}>
      <div className={styles.labItemImageContainer}>
        <a href={item.url} title={item.title} target="_blank" rel="noreferrer">
          <Image alt={item.title} src={item.image} fill={true} />
        </a>
      </div>
      <div className={styles.labItemDetails}>
        <h1>
          <a href={item.url} title={item.title} target="_blank" rel="noreferrer">
            {item.title}
          </a>
        </h1>
        <div>
          <time>
            {t("{{val, datetime}}", {
              val: new Date(item.timestamp),
            })}
          </time>
        </div>
        <p>{item.description}</p>
        <footer>
          <div>
            {item.stack.map(stackItem => (
              <span key={uuidv4()}>{stackItem}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProjectItemDisplay;
