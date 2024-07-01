import { PostItem } from "@/lib/content";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type PostProps = { post: PostItem };

const PostItemDisplay: React.FC<PostProps> = ({ post }: PostProps) => {
  const postDate = new Date(post.publishedAt);
  return (
    <article className="flex flex-col md:flex-row justify-between">
      <h1 className="font-semibold">
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
      <time>{format(postDate, "PP")}</time>
    </article>
  );
};

export default PostItemDisplay;
