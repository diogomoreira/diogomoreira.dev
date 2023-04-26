import React from "react";
import { useAppConfig } from "@/lib/config";
import styles from "@/styles/components/footer.module.scss";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  const {
    siteVersion,
    author: { name },
  } = useAppConfig();
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footerContainer}>
      <SocialIcons />
      <div>
        <b>{siteVersion}</b>. Copyright © 2013 - {currentYear}. {name}
      </div>
      <div>
        Check out the <a href="https://github.com/diogomoreira/diogodmoreira.com">source code</a>
      </div>
    </footer>
  );
};

export default Footer;
