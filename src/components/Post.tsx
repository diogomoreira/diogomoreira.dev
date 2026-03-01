import { Content } from "@/lib/content";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { HashTag, Tag, Tags } from "./Tag";

type PostProps = { post: Content };

const PostItem: React.FC<PostProps> = ({ post }: PostProps) => {
  const postDate = new Date(post.date);
  const postUrl = `/posts/${post.slug}`;
  const postTitle = post.title;
  const postDescription = post.description;
  const postCategory = post.category;
  return (
    <article className="flex flex-col md:flex-row gap-6">
      <a href={postUrl} className="md:max-w-1/4" title={postTitle} target="_blank" rel="noopener noreferrer">
        <Image
          className="object-contain mx-auto rounded-lg border-4 border-spring-wood-200/50 dark:border-neutral-800/50 shadow-lg"
          alt={postTitle}
          src={post.cover}
          width={1920}
          height={1080}
        />
      </a>
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-2xl font-semibold">{postTitle}</h2>
        <p className="py-2 border-b border-spring-wood-200/50 dark:border-neutral-800/50">{postDescription}</p>
        <p className="text-sm">
          Posted in <Tag>{postCategory}</Tag> on {format(postDate, "PP")}
        </p>
        <Tags>{post.tags?.map(tag => <HashTag key={tag}>{tag}</HashTag>)}</Tags>
      </div>
    </article>
  );
};

export default PostItem;
