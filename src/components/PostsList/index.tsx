import React from "react";
import { PostItem } from "@/lib/content";
import PostItemDisplay from "../PostItemDisplay";
import EmptyState, { EmptyContentType } from "../Layout/EmptyState";

type PostsListProps = {
  posts: PostItem[];
};

const PostsList: React.FC<PostsListProps> = ({ posts }: PostsListProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className="post-card-container">
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
