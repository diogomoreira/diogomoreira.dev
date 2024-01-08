import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trans as Translation, useTranslation } from "next-i18next";
import Section from "@/components/Section";
import SocialIcons from "@/components/SocialIcons";
import { useAppConfig } from "@/config";

const Author = () => {
  const { author, title } = useAppConfig();
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <Image
          className="rounded-full border-2 dark:border-slate-700 mx-auto"
          src={author.image}
          width={175}
          height={175}
          alt={title}
        />
        <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-4xl">
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2 className="font-light">
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            <Translation
              t={t}
              ns={"common"}
              i18nKey="common.readmore"
              components={[<Link key="read-more-link" href={"/about"} />]}
            ></Translation>
          </p>
          <SocialIcons />
        </div>
      </div>
      <div>
        <p className="leading-loose mb-6">
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
