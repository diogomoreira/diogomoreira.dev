import { ContentPath, PostItem } from "@/lib/content";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import { Tag, Tags } from "../Tag";
import Link from "next/link";
import { differenceInDays } from "date-fns";
import { Button } from "../Button";

type PostProps = { post: PostItem };

const PostItemDisplay: React.FC<PostProps> = ({ post }: PostProps) => {
  const { t } = useTranslation();
  const postDate = new Date(post.publishedAt);
  return (
    <article className="post-card">
      <a href={post.url} title={post.title} target="_blank" rel="noopener noreferrer">
        <div className="post-card-cover-container">
          <Image
            className="post-card-cover"
            width={241}
            height={136}
            src={post.origin === "md" ? `${ContentPath.POSTS_COVER_IMAGES}/${post.coverImage}` : post.coverImage}
            alt={post.title}
          />
        </div>
      </a>
      <div className="post-card-info">
        <h1 className="post-card-title">
          {post.origin === "md" ? (
            <Link locale={false} href={post.url}>
              {post.title}
            </Link>
          ) : (
            <a href={post.url} title={post.title} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          )}
        </h1>
        <time className="post-card-meta-timestamp">
          <span>
            {t("{{val, datetime}}", {
              val: postDate,
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </span>
          <span>
            (
            {t("{{val, relativetime}}", {
              val: differenceInDays(postDate, new Date()),
            })}
            )
          </span>
        </time>
        <Tags>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </div>
    </article>
  );
};

export default PostItemDisplay;
