import React from "react";
import styles from "@/styles/components/content.module.scss";

type MainContentProps = {
  children: React.ReactNode;
};

const Content: React.FC<MainContentProps> = ({ children }: MainContentProps) => {
  return <main className={styles.mainContentContainer}>{children}</main>;
};

const ContentFluid: React.FC<MainContentProps> = ({ children }: MainContentProps) => {
  return <main className={styles.mainContentContainerFluid}>{children}</main>;
};

export { Content, ContentFluid };
