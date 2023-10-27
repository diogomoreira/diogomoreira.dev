import React from "react";
import styles from "@/styles/components/cv.module.scss";

type CVWorkItemProps = {
  position: string;
  company: string;
  location: string;
  type: "onsite" | "remote";
  startDate: Date;
  endDate?: Date;
  description: string;
};

const CVWorkItem: React.FC<CVWorkItemProps> = (props: CVWorkItemProps) => {
  const { position, company, location, type, startDate, endDate, description } = props;
  return (
    <div className={styles.workItem}>
      <div className={styles.workItemTitle}>
        <h3>{position}</h3>
        <div>
          (<time>{startDate.toLocaleDateString()}</time> -{" "}
          <time>{endDate ? endDate.toLocaleDateString() : "Current"}</time>)
        </div>
      </div>
      <div>
        <span className={styles.companyName}>{company}</span> ({location}) - {type}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default CVWorkItem;
