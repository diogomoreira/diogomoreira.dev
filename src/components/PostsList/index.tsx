import React from "react";
import EmptyState, { EmptyContentType } from "../Layout/EmptyState";
import PostItemDisplay from "../PostItemDisplay";
import { Post } from "@/models/post.model";

type PostsListProps = {
  posts: Post[];
};

const PostsList: React.FC<PostsListProps> = ({ posts }: PostsListProps) => {
  return (
    <>
      <div className="grid grid-flow-row gap-4">
        {posts?.map(note => (
          <PostItemDisplay key={note.path} post={note} />
        ))}
      </div>
    </>
  );
};

export default PostsList;
