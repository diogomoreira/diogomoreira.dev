import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { Trans as Translation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import PostsList from "@/components/PostsList";
import Section from "@/components/Section";
import { useAppConfig } from "@/config";
import { PostItem, getAllPosts } from "@/lib/content";
import styles from "@/styles/pages/index.module.scss";
import { Content } from "@/components/Layout/Content";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["index", "common"])),
    },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  useEffect(() => {
    getAllPosts().then(posts => setPosts(posts));
  }, []);

  const { author, title, description } = useAppConfig();
  const { t } = useTranslation(["index", "common"]);

  return (
    <Content>
      <NextSeo title="Home Page" description={description} />
      <div className={styles.container}>
        <div>
          <Image src={author.image} width={175} height={175} alt={title} />
        </div>
        <div>
          <h1>
            <Translation t={t} i18nKey="me" components={[<strong key="name" />]}></Translation>
          </h1>
          <h2>
            <Translation t={t} i18nKey="titles"></Translation>
          </h2>
          <p>
            <Translation
              t={t}
              ns={"common"}
              i18nKey="common.readmore"
              components={[<Link key="read-more-link" href={"/about"} />]}
            ></Translation>
          </p>
        </div>
      </div>
      <div>
        <p>
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
      <Section>
        <Translation t={t} ns={"index"} i18nKey="latest"></Translation>
      </Section>
      <div className={styles.notes}>
        <div>
          <PostsList posts={posts} />
        </div>
        <div>
          <Link href={"/blog"}>
            <Translation t={t} ns={"common"} i18nKey="common.seemore"></Translation>
          </Link>
        </div>
      </div>
    </Content>
  );
};

export default IndexPage;
