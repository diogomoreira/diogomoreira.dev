import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Trans as Translation, useTranslation } from "next-i18next";
import React from "react";
import { Content } from "@/components/Layout/Content";
import styles from "@/styles/pages/post.module.scss";
import { NextSeo } from "next-seo";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["uses", "common"])),
    },
  };
};

type UsesPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const UsesPage: NextPage<UsesPageProps> = () => {
  const { t } = useTranslation(["uses", "common"]);
  return (
    <Content>
      <NextSeo
        title="Uses"
        description="Elements of my setup that have enhanced my productivity and efficiency, from hardware to software."
      />
      <h1>💻 {t("title")}</h1>
      <article className={styles.content}>
        <p>
          Hello there! In this post, I want to share with you the tools that I have been using on my workflow and helped
          me become more productive and efficient. This is a always evolving post, so I&#39;ll try to keep track of what
          has changed through the years and why. Inspired by{" "}
          <a href="https://uses.tech/">
            Wes Bos&#39;s <strong>uses.tech</strong>
          </a>
          .
        </p>
        <h2 id="applications-⌨️">Applications ⌨️</h2>
        <ul>
          <li>
            <strong>Visual Studio code</strong>. My main app for software development and anything related. My VSCode
            configuration in terms on theme, font and extensions changes a lot dependending on what I&#39;ve been
            studying/doing lately. Here&#39;s my current setup:
            <ul>
              <li>
                <strong>Editor font</strong>: <a href="https://input.djr.com/download/">Input</a>. It doesn&#39;t
                support font ligatures but it&#39;s something that I&#39;ve stopped using lately, since it confuses some
                explanations on my classes (arrow functions, for example).
              </li>
              <li>
                <strong>Theme</strong>:{" "}
                <a href="https://marketplace.visualstudio.com/items?itemName=DaltonMenezes.aura-theme#:~:text=Open%20the%20Extensions%20sidebar%20in%20VS%20Code%20Search,Preferences%3A%20Color%20Theme%20and%20choose%20an%20Aura%20variant">
                  Aura Soft Dark (Soft Text)
                </a>
              </li>
              <li>
                <strong>Extensions</strong>: CodeSnap. Image Preview. Import Cost. Jest. Jest Snippets. Live Server.
                Markdown All In One. Prettier. Rainbow CSV. Template String Converter. Wakatime.
              </li>
            </ul>
          </li>
          <li>
            <strong>Spotify</strong>. My main music app since 2014, I hate the podcast section inside the app but I
            still use it anyway. Check{" "}
            <a href="https://open.spotify.com/user/diogodmoreira?si=ec78266e7ccf4268">my playlists</a>.
          </li>
          <li>
            <strong>Intellij IDEA Ultimate</strong>. Since I work as a professor, I have a license to use the Ultimate
            version of Intellij IDEA, and honestly, it&#39;s by far the best IDE to work with Java related
            technologies/frameworks such as Spring Boot.
          </li>
          <li>
            <strong>Insomnia</strong>/Postman. I&#39;ve used Postman a lot before, however, Insomnia is managing to meet
            all my needs lately, I can&#39;t give a specific reason for switching.
          </li>
          <li>
            <strong>
              iTerm2 w/ ZSH + <a href="https://ohmyz.sh/">Oh-my-ZSH</a>
            </strong>
            . On top of this configuration, I&#39;m using{" "}
            <a href="https://github.com/romkatv/powerlevel10k">Powerlevel10k</a>.
          </li>
          <li>
            <strong>Notion</strong>.
          </li>
          <li>
            <strong>Slack</strong>.
          </li>
          <li>
            <strong>DBeaver</strong>.
          </li>
          <li>
            <strong>Microsoft Edge</strong>.
          </li>
          <li>
            <strong>Homebrew</strong>.
          </li>
          <li>
            <a href="https://github.com/jqlang/jq">
              <strong>JQ</strong>
            </a>
            .
          </li>
          <li>
            <strong>1Password</strong>.
          </li>
          <li>
            <strong>Karabiner-Elements</strong>.
          </li>
          <li>
            <strong>Magnet</strong>.
          </li>
        </ul>
        <h2 id="academic-stuff-👨🏻🏫">Academic Stuff 👨🏻‍🏫</h2>
        <ul>
          <li>
            <a href="https://www.tug.org/mactex/">
              <strong>MacTeX</strong>
            </a>{" "}
            to compile my LaTeX files edited on{" "}
            <a href="https://www.texstudio.org/">
              <strong>TeXStudio</strong>
            </a>
            .
          </li>
          <li>
            <strong>Google Slides</strong>.
          </li>
          <li>
            <a href="https://gitbook.io">
              <strong>Gitbook</strong>
            </a>
            .
          </li>
        </ul>
        <h2 id="hardware-💻">Hardware 💻</h2>
        <ul>
          <li>Macbook Pro 13-inch, M1, 2020, 16GB</li>
          <li>LG 29UM69G Ultrawide</li>
          <li>iPhone 11</li>
          <li>Apple Watch Series 7</li>
          <li>Logitech MX Master 3</li>
          <li>Keychron K2v2</li>
          <li>HyperX Quadcast</li>
        </ul>
        <h2 id="gaming-🕹️">Gaming 🕹️</h2>
        <ul>
          <li>
            <p>
              <strong>Nintendo Switch</strong>. Currently playing: <strong>Shin Megami Tensei V</strong>.
            </p>
          </li>
          <li>
            <p>
              <strong>Other consoles on standby</strong>:
            </p>
            <ul>
              <li>Playstation Portable</li>
              <li>Playstation 3</li>
              <li>Playstation 4</li>
              <li>Nintendo 3DS</li>
              <li>Xbox Series S</li>
            </ul>
          </li>
        </ul>
      </article>
    </Content>
  );
};

export default UsesPage;
