import React from "react";
import { useAppConfig } from "@/config";
import { articleJsonLd } from "@/config/seo.config";
import { ContentPath, getNoteByPath, getNotesSlugs, markdownToHTML } from "@/lib/content";
import styles from "@/styles/pages/slug.module.scss";
import { InferGetStaticPropsType } from "next";
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

const Note: React.FC<NoteProps> = ({ source, post }: NoteProps) => {
  const { siteUrl } = useAppConfig();
  const postUrl = `${siteUrl}/notes/${post.slug}`;

  return (
    <Content>
      <NextSeo title={post.title} description={post.description} />
      <ArticleJsonLd
        url={postUrl}
        title={post.title}
        description={post.description}
        datePublished={post.timestamp}
        dateModified={post.timestamp}
        images={[`${siteUrl}/${post.cover || logo.src}`]}
        {...articleJsonLd}
      />
      <article>
        <h1 className={styles.noteTitle}>{post.title}</h1>
        <p className={styles.noteDescription}>{post.description}</p>
        <div className={styles.noteDetails}>
          <time className={styles.noteDetailsTimestamp}>
            <span>
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <span>{formatDateI18N(post.timestamp)}</span>
          </time>
          <div className={styles.noteDetailsCategory}>
            <span>{post.category}</span>
          </div>
          <div className={styles.noteDetailsTags}>
            <div className={styles.noteDetailsTagsList}>
              {post.tags.map(tag => (
                <span key={uuid()}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        {post.cover && (
          <div className={styles.cover}>
            <Image src={`${ContentPath.NOTES_COVER_IMAGES}/${post.cover}`} fill alt={post.title} />
          </div>
        )}
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: source }}></div>
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
  const source = await markdownToHTML(post.body);
  return {
    props: {
      source,
      post: post,
    },
  };
}

export async function getStaticPaths() {
  const notes = await getNotesSlugs();
  return {
    paths: notes.map<StaticPropsParams>(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export default Note;
