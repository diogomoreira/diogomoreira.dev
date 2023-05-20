import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import styles from "@/styles/pages/about.module.scss";
import Image from "next/image";
import { useAppConfig } from "@/lib/config";

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const AboutPage: NextPage<AboutPageProps> = () => {
  const {
    author: { name },
  } = useAppConfig();
  return (
    <>
      <NextSeo title="About me" description="A little more about me" />

      <h1>👋🏻 About me</h1>
      <div className={styles.cover}>
        <Image src={"/images/pages/about/cover.jpg"} width={1000} height={500} alt={name} />
      </div>
      <p>
        For those who are new here, let me introduce myself. My name is <strong>Diogo Dantas Moreira</strong>, and I
        hold a degree in <strong>System Analysis and Development</strong> from the{" "}
        <a href="https://ifpb.edu.br">Federal Institute of Paraíba</a>, where I later worked as an adjunct professor. I
        completed my specialization in <strong>Software Engineering</strong> in 2015 and my master&apos;s degree in the
        same field from 2017 to 2019, during which I discovered my passion for <strong>Software Testing</strong>.
        Currently, I teach subjects related to <strong>Software Engineering</strong>, <strong>Software Testing</strong>,
        and <strong>Design Patterns</strong>.
      </p>
      <p>
        Aside from work, I enjoy playing video games, particularly role-playing games. I also enjoy reading, although I
        wish I had more time for it. I love watching anime, TV series, and movies, especially those related to science
        fiction and fantasy themes. I&apos;m a football fan and support São Paulo FC. I also love traveling,
        experiencing new cultures, trying new things, and most importantly, spending time with friends and family while
        enjoying a good beer 🍻.
      </p>
      <p>
        In terms of content, expect to see posts about web development and software testing, the areas I&apos;ve been
        studying extensively lately. Gradually, I&apos;ll share more about my life and interests here.
      </p>
      <p>
        I hope you enjoy the content I post, and I welcome any suggestions or requests in the comments section below. 😊
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["about"])),
    },
  };
};

export default AboutPage;
