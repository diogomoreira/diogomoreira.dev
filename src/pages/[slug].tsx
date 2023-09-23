import React from "react";
import { useAppConfig } from "@/lib/config";
import { articleJsonLd } from "@/lib/config/seo.config";
import { ContentPath, getNoteByPath, getNotesSlugs, mdxToHtml } from "@/lib/content";
import styles from "@/styles/pages/slug.module.scss";
import { InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import logo from "public/images/logo.png";
import formatDateI18N from "@/utils/date.i18.formatter";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Content } from "@/components/Layout/Content";
import Comments from "@/components/Comments";

type NoteProps = InferGetStaticPropsType<typeof getStaticProps>;

const Note: React.FC<NoteProps> = ({ source, frontMatter }: NoteProps) => {
  const { siteUrl } = useAppConfig();
  const postUrl = `${siteUrl}/notes/${frontMatter.slug}`;

  return (
    <Content>
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
        <h1 className={styles.noteTitle}>{frontMatter.title}</h1>
        <p className={styles.noteDescription}>{frontMatter.description}</p>
        <div className={styles.noteDetails}>
          <time className={styles.noteDetailsTimestamp}>
            <span>
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span>{formatDateI18N(frontMatter.timestamp)}</span>
          </time>
          <div className={styles.noteDetailsCategory}>
            <span>{frontMatter.category}</span>
          </div>
          <div className={styles.noteDetailsTags}>
            <div className={styles.noteDetailsTagsList}>
              {frontMatter.tags.map(tag => (
                <span key={uuid()}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        {frontMatter.cover && (
          <div className={styles.cover}>
            <Image src={`${ContentPath.NOTES_COVER_IMAGES}/${frontMatter.cover}`} fill alt={frontMatter.title} />
          </div>
        )}
        <div className={styles.content}>
          <MDXRemote {...source} />
        </div>
        <Comments />
      </article>
    </Content>
  );
};

type StaticPropsParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: StaticPropsParams) {
  const { slug } = params;
  const post = await getNoteByPath(slug);
  const source = await mdxToHtml(post);
  return {
    props: {
      source,
      frontMatter: post,
    },
  };
}

export async function getStaticPaths() {
  const notes = await getNotesSlugs();
  return {
    paths: notes.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export default Note;
