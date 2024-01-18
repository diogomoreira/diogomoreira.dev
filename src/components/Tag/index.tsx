import React from "react";

type TagProps = {
  children: React.ReactNode;
};

const Tags: React.FC<TagProps> = ({ children }: TagProps) => {
  return <div className="tags-container">{children}</div>;
};

const Tag: React.FC<TagProps> = ({ children }: TagProps) => {
  return <span className="tag">{children}</span>;
};

const HashTag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <Tag>
      <span className="tag-hash">#</span>
      <span>{children}</span>
    </Tag>
  );
};

const BulletTag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <Tag>
      <span>
        <svg className="tag-bullet" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3"></circle>
        </svg>
      </span>
      <span>{children}</span>
    </Tag>
  );
};

export { Tags, Tag, BulletTag, HashTag };
