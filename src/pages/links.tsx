import { Content } from "@/components/Layout/Content";

import LinksPageItem from "@/components/LinksPageItem";
import { useAppConfig } from "@/lib/config";
import { NextPage } from "next";
import React from "react";
import styles from "@/styles/pages/links.module.scss";
import Image from "next/image";
import SocialIcons from "@/components/Layout/Footer/SocialIcons";

const LinksPage: NextPage = () => {
  const { author } = useAppConfig();
  return (
    <Content>
      <div className={styles.profilePhotoContainer}>
        <Image src={author.image} width={175} height={175} alt={author.name} className={styles.profilePhoto} />
      </div>
      <div className={styles.presentation}>
        <h1 className={styles.title}>{author.name}</h1>
      </div>
      <div className={styles.presentation}>
        <SocialIcons />
      </div>
      <div className={styles.links}>
        <LinksPageItem icon="🌎" description="About me" href="https://diogodmoreira.com" />
        <LinksPageItem icon="🛠️" description="Development tools/hardware I use" href="https://diogodmoreira.com/uses" />
      </div>
    </Content>
  );
};

export default LinksPage;
