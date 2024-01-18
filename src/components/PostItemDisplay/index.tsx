import { ContentPath, PostItem } from "@/lib/content";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import { Card } from "../Card";
import { Tag, Tags } from "../Tag";
import ExternalLink from "../Link/ExternalLink";
import Link from "next/link";
import { FaDev } from "react-icons/fa6";

type PostProps = { post: PostItem };

const PostItemDisplay: React.FC<PostProps> = ({ post }: PostProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <article className="flex flex-row">
        <a href={post.url} title={post.title} target="_blank" rel="noopener noreferrer">
          <div className="shadow-sm w-40 h-full">
            {post.origin === "md" ? (
              <Image
                className="object-cover h-full"
                width={241}
                height={136}
                src={`${ContentPath.POSTS_COVER_IMAGES}/${post.coverImage}`}
                alt={post.title}
              />
            ) : (
              <Image className="object-cover h-full" width={241} height={136} src={post.coverImage} alt={post.title} />
            )}
          </div>
        </a>
        <div className="p-4 flex flex-col gap-2">
          <div>
            <h1 className="text-lg font-bold">
              {post.origin === "md" ? (
                <Link href={post.url}>{post.title}</Link>
              ) : (
                <ExternalLink url={post.url} title={post.title}>
                  <span className="flex gap-4 items-center">
                    {post.title} {post.origin === "dev.to" ? <FaDev className="text-2xl" /> : ""}
                  </span>
                </ExternalLink>
              )}
            </h1>
          </div>
          <time className="text-sm text-slate-500 dark:text-slate-300">
            {t("{{val, datetime}}", {
              val: new Date(post.publishedAt),
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </time>
          <Tags>
            {post.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        </div>
      </article>
    </Card>
  );
};

export default PostItemDisplay;
