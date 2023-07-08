import Navigation from "./Navigation";
import styles from "@/styles/components/layout.module.scss";
import React from "react";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, className }: LayoutProps) => {
  return (
    <div className={`${styles.layoutContainer} ${className}`}>
      <Navigation />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
