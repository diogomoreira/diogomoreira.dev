import Navigation from "@/components/Navigation";
import styles from "@/styles/components/layout.module.scss";
import React from "react";
import Footer from "../Footer";
import MainContent from "../MainContent";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
}: LayoutProps) => {
  return (
    <div className={`${styles.layoutContainer} ${className}`}>
      <Navigation />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
};

export default Layout;
