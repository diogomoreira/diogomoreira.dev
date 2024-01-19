import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trans as Translation, useTranslation } from "next-i18next";
import SocialIcons from "@/components/SocialIcons";
import { useAppConfig } from "@/config";

const Author = () => {
  const { author, title } = useAppConfig();
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <div className="author-container">
        <Image className="author-image" src={author.image} width={175} height={175} alt={title} />
        <div className="author-presentation">
          <h1 className="author-title">
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2 className="author-subtitle">
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
          <div className="author-readmore">
            <Translation
              t={t}
              ns={"common"}
              i18nKey="common.readmore"
              components={[<Link key="read-more-link" href={"/about"} />]}
            ></Translation>
          </div>
          <SocialIcons />
        </div>
      </div>
      <div>
        <p className="page-description">
          <Translation
            t={t}
            i18nKey="presentation"
            components={{
              bold: <strong key={"bold"} />,
              blog: <Link href={"/blog"} />,
            }}
          ></Translation>
        </p>
      </div>
    </>
  );
};

export default Author;
