import React from "react";

export enum EmptyContentType {
  POSTS = "posts",
  PAPERS = "papers",
  PROJECTS = "projects",
  BOOKMARKS = "bookmarks",
}

export type EmptyStateProps = {
  type: EmptyContentType;
};

const EmptyState: React.FC<EmptyStateProps> = ({ type }: EmptyStateProps) => {
  return (
    <div className="flex justify-center items-center w-full h-52">
      <span>No {type} found.</span>
    </div>
  );
};

export default EmptyState;
