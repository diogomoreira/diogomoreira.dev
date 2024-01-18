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
        <div className="grid grid-flow-row gap-2">
          {posts?.map(note => (
            <div key={note.id}>
              <PostItemDisplay post={note} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState type={EmptyContentType.POSTS} />
      )}
    </>
  );
};

export default PostsList;
