import React from "react";
import styles from "@/styles/components/maincontent.module.scss";

type MainContentProps = {
  children: React.ReactNode;
};

const MainContent: React.FC<MainContentProps> = ({ children }: MainContentProps) => {
  return <main className={styles.mainContentContainer}>{children}</main>;
};

export default MainContent;
