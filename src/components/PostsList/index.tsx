import { PostItem } from "@/lib/content";
import React from "react";
import EmptyState, { EmptyContentType } from "../Layout/EmptyState";
import PostItemDisplay from "../PostItemDisplay";

type PostsListProps = {
  posts: PostItem[];
};

const PostsList: React.FC<PostsListProps> = ({ posts }: PostsListProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-flow-row gap-4">
          {posts?.map(note => (
            <PostItemDisplay key={note.id} post={note} />
          ))}
        </div>
      ) : (
        <EmptyState type={EmptyContentType.POSTS} />
      )}
    </>
  );
};

export default PostsList;
