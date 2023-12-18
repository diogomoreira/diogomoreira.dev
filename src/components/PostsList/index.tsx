import React from "react";
import { PostItem } from "@/lib/content";
import styles from "@/styles/components/postlist.module.scss";
import PostItemDisplay from "../PostItemDisplay";
import EmptyState, { EmptyContentType } from "../EmptyState";

type PostsListProps = {
  posts: PostItem[];
};

const PostsList: React.FC<PostsListProps> = ({ posts }: PostsListProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className={styles.postsContainer}>
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
