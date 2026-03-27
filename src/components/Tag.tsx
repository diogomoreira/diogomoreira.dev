import React from "react";

type TagProps = {
  children: React.ReactNode;
};

const Tags: React.FC<TagProps> = ({ children }: TagProps) => {
  return <div className="flex gap-2 flex-wrap">{children}</div>;
};

const Tag: React.FC<TagProps> = ({ children }: TagProps) => {
  return <span className="badge badge-accent font-bold text-shadow-sm text-xs">{children}</span>;
};

const HashTag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <Tag>
      <span>{children}</span>
    </Tag>
  );
};

const BulletTag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <Tag>
      <span>
        <svg className="mr-1.5 h-2 w-2 text-spring-wood-400 dark:text-gray-100" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3"></circle>
        </svg>
      </span>
      <span>{children}</span>
    </Tag>
  );
};

export { BulletTag, HashTag, Tag, Tags };
