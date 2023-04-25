import React from "react";
import { useAppMetadata } from "@/lib/config";
import { articleJsonLd } from "@/lib/config/seo.config";
import { getAllNotes, getNoteBySlug, mdxToHtml } from "@/lib/content";
import styles from "@/styles/pages/post/postpage.module.scss";
import Giscus from "@giscus/react";
import { InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import logo from "public/images/logo.png";

type NoteProps = InferGetStaticPropsType<typeof getStaticProps>;

const Note: React.FC<NoteProps> = ({ source, frontMatter }: NoteProps) => {
  const { siteUrl } = useAppMetadata();
  const postUrl = `${siteUrl}/notes/${frontMatter.slug}`;
  return (
    <>
      <NextSeo title={frontMatter.title} description={frontMatter.description} />
      <ArticleJsonLd
        url={postUrl}
        title={frontMatter.title}
        description={frontMatter.description}
        datePublished={frontMatter.timestamp}
        dateModified={frontMatter.timestamp}
        images={[`${siteUrl}/${frontMatter.cover || logo.src}`]}
        {...articleJsonLd}
      />
      <article>
        <h1>{frontMatter.title}</h1>
        {frontMatter.cover && (
          <div className={styles.cover}>
            <Image src={`/images/posts/cover/${frontMatter.cover}`} fill={true} alt={frontMatter.title} />
          </div>
        )}
        <div className={styles.content}>
          <MDXRemote {...source} />
        </div>
        <Giscus
          id="note-comments"
          repo="diogomoreira/diogodmoreira.com"
          repoId="MDEwOlJlcG9zaXRvcnkzNjM3NTY5NTM="
          category="General"
          categoryId="DIC_kwDOFa59mc4CV9_B"
          mapping="url"
          term="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="dark_protanopia"
          lang="en"
          loading="lazy"
        />
      </article>
    </>
  );
};

type StaticPropsParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: StaticPropsParams) {
  const post = getNoteBySlug(params.slug);
  const source = await mdxToHtml(post.content, post);
  return {
    props: {
      source,
      frontMatter: post,
    },
  };
}

export async function getStaticPaths() {
  const notes = getAllNotes();
  return {
    paths: notes.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export default Note;
