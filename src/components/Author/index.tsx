import React from "react";

import { useAppConfig } from "@/config";
import { Trans as Translation, useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

const Author = () => {
  const { author, title } = useAppConfig();
  const { t } = useTranslation(["index", "common"]);

  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <Image
          className="border-2 dark:border-gray-700 mx-auto rounded-md brightness-100 contrast-100 grayscale"
          src={author.image}
          width={175}
          height={175}
          alt={title}
        />
        <div className="flex-1 flex flex-col gap-2 text-center">
          <h1 className="text-4xl">
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2 className="font-light">
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
        </div>
      </div>
      <div>
        <p className="mx-auto md:px-0 mt-2 leading-loose mb-6">
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
