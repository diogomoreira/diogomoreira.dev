import { PostItem } from "@/lib/content";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import { Card, CardBody, CardFooter, CardImage, CardTitle } from "../Card";
import { Tag, Tags } from "../Tag";

type PostProps = { post: PostItem };

const PostItemDisplay: React.FC<PostProps> = ({ post }: PostProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <article>
        <CardImage url={post.url} title={post.title}>
          <Image className="object-contain" src={post.cover_image} alt={post.title} width={1920} height={1080} />
        </CardImage>
        <CardBody>
          <CardTitle url={post.url} title={post.title} />
          <Tags>
            {post.tag_list.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        </CardBody>
        <CardFooter>
          <time>
            {t("{{val, datetime}}", {
              val: new Date(post.published_at),
            })}
          </time>
          <span>
            {post.reading_time_minutes} {t("common.minutes")}
          </span>
        </CardFooter>
      </article>
    </Card>
  );
};

export default PostItemDisplay;
