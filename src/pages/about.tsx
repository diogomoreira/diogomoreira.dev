import React from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import styles from "@/styles/pages/about.module.scss";
import contentStyle from "@/styles/pages/slug.module.scss";
import Image from "next/image";
import { useAppConfig } from "@/lib/config";
import Link from "next/link";
import { Content } from "@/components/Layout/Content";

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const AboutPage: NextPage<AboutPageProps> = () => {
  const {
    author: { name },
  } = useAppConfig();
  return (
    <Content>
      <NextSeo title="About me" description="A little more about me" />

      <h1>👋🏻 About me</h1>
      <div className={styles.cover}>
        <Image src={"/images/pages/about/cover.jpg"} fill alt={name} />
      </div>
      <div className={contentStyle.content}>
        <p>
          For those who are new here, let me introduce myself. My name is <strong>Diogo Dantas Moreira</strong>, born
          and living in Brazil.
        </p>
        <p>
          I enjoy playing video games, particularly role-playing games. I also enjoy reading, although I wish I had more
          time for it. I love watching anime, TV series, and movies, especially those related to science fiction and
          fantasy themes. Take a look at some of the things I&apos;m into lately <Link href={"/links"}>here</Link>.
        </p>
        <p>
          I&apos;m a soccer fan and <b>São Paulo FC</b> supporter. Lately I&apos;ve been enjoying Formula 1 as well.
        </p>
        <p>
          I also love traveling, experiencing new cultures, trying new things, and most importantly, spending time with
          friends and family while enjoying a good beer 🍻.
        </p>
        <p>
          I hold a degree in <strong>System Analysis and Development</strong> from the{" "}
          <a href="https://ifpb.edu.br">Federal Institute of Paraíba</a>, where I later worked as an adjunct professor.
          I completed my specialization in <strong>Software Engineering</strong> in 2015 and my master&apos;s degree in
          the same field from 2017 to 2019, during which I discovered my passion for <strong>Software Testing</strong>.
          Currently, I teach subjects related to <strong>Software Engineering</strong>,{" "}
          <strong>Software Testing</strong>, and <strong>Design Patterns</strong>. You can expect to see posts about web
          development and software testing here, the areas I&apos;ve been studying extensively lately.
        </p>
        <p>Gradually, I&apos;ll share more about my life and interests here.</p>
      </div>
    </Content>
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
