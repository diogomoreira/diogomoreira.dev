import { LabItem } from "@/lib/content";
import styles from "@/styles/components/labitem.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type LabItemProps = {
  item: LabItem;
};

const LabItemDisplay: React.FC<LabItemProps> = ({ item }: LabItemProps) => {
  const router = useRouter();
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
          <time>{formatDateI18N(item.timestamp, router.locale ?? "en")}</time>
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

export default LabItemDisplay;
