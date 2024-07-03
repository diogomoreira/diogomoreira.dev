import React from "react";

type TagProps = {
  children: React.ReactNode;
};

const Tags: React.FC<TagProps> = ({ children }: TagProps) => {
  return <div className="flex gap-1 flex-wrap">{children}</div>;
};

const Tag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <span className="inline-flex items-center bg-spring-wood-100 dark:bg-neutral-950 px-2 py-1 text-xs font-medium text-spring-wood-600 dark:text-gray-200 ring-1 ring-inset ring-spring-wood-500/10">
      {children}
    </span>
  );
};

const HashTag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <Tag>
      <span className="text-spring-wood-400 dark:text-gray-400">#</span>
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
