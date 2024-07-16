import { Post } from "@/models/post.model";
import { format } from "date-fns";
import React from "react";

type PostProps = { post: Post };

const PostItemDisplay: React.FC<PostProps> = ({ post }: PostProps) => {
  const postDate = new Date(post.date);
  return (
    <article className="flex flex-col md:flex-row justify-between">
      <h1 className="font-semibold">
        <a href={post.path} title={post.title} target="_blank" rel="noopener noreferrer">
          {post.title}
        </a>
      </h1>
      <time>{format(postDate, "PP")}</time>
    </article>
  );
};

export default PostItemDisplay;
