import React from "react";
import styles from "@/styles/components/emptystate.module.scss";

export enum EmptyContentType {
  POSTS = "posts",
  PAPERS = "papers",
  PROJECTS = "projects",
  LINKS = "links",
}

export type EmptyStateProps = {
  type: EmptyContentType;
};

const EmptyState: React.FC<EmptyStateProps> = ({ type }: EmptyStateProps) => {
  return <div className={styles.container}>No {type} found.</div>;
};

export default EmptyState;
