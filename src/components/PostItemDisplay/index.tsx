import { PostItem } from "@/lib/content";
import styles from "@/styles/components/postlist.module.scss";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import { FaComments, FaRegThumbsUp } from "react-icons/fa6";

type PostProps = { post: PostItem };

const PostItemDisplay: React.FC<PostProps> = ({ post }: PostProps) => {
  const { t } = useTranslation();
  return (
    <article className={styles.post}>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <div className={styles.cover}>
          <Image
            src={post.cover_image}
            fill
            alt={post.title}
            sizes="33vw"
            style={{
              objectFit: "cover", // cover, contain, none
            }}
          />
        </div>
      </a>
      <div className={styles.postTags}>
        {post.tag_list.map(tag => (
          <span className={styles.postTag} key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <div className={styles.postItem}>
          <h1>{post.title}</h1>
        </div>
      </a>

      <div className={styles.postMetadata}>
        <div>
          <span>{t("common.publishedAt")}</span>
          <time>
            {t("{{val, datetime}}", {
              val: new Date(post.published_at),
            })}
          </time>
        </div>
        <div>
          <span>
            {post.reading_time_minutes} {t("common.minutes")}
          </span>
          <span>
            <FaComments /> {post.comments_count}
          </span>
          <span>
            <FaRegThumbsUp /> {post.public_reactions_count}
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostItemDisplay;
