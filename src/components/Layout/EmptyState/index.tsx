import React from "react";

export enum EmptyContentType {
  POSTS = "posts",
  PAPERS = "papers",
  PROJECTS = "projects",
  LINKS = "links",
}

export type EmptyStateProps = {
  type: EmptyContentType;
};

const EmptyState: React.FC<EmptyStateProps> = ({ type }: EmptyStateProps) => {
  return (
    <div className="loader-container">
      <span>No {type} found.</span>
    </div>
  );
};

export default EmptyState;
