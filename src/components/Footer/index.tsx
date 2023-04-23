import { useAppMetadata } from "@/lib/config";
import styles from "@/styles/components/footer.module.scss";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  const { siteVersion, author } = useAppMetadata();
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footerContainer}>
      <SocialIcons />
      <div>
        <b>{siteVersion}</b>. Copyright © 2013 - {currentYear}. {author.name}
      </div>
      <div>
        Check out the{" "}
        <a href="https://github.com/diogomoreira/diogodmoreira.com">
          source code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
