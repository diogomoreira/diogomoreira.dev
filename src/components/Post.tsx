import { Content } from "@/lib/content";
import { lightFormat } from "date-fns";
import React from "react";

type PostProps = { post: Content };

const PostItem: React.FC<PostProps> = ({ post }: PostProps) => {
  const postDate = new Date(post.date);
  const postTitle = post.title;
  return (
    <article className="w-full flex justify-between items-center gap-4">
      <h2 className="inline font-semibold">{postTitle}</h2>
      <span className="text-sm">{lightFormat(postDate, "yyyy-MM-dd")}</span>
    </article>
  );
};

export default PostItem;
