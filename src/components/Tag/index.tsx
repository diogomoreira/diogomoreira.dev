import React from "react";

type TagProps = {
  children: React.ReactNode;
};

const Tags: React.FC<TagProps> = ({ children }: TagProps) => {
  return <div className="flex gap-1 flex-wrap">{children}</div>;
};

const Tag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-200 ring-1 ring-inset ring-slate-500/10">
      {children}
    </span>
  );
};

const BulletTag: React.FC<TagProps> = ({ children }: TagProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-200 ring-1 ring-inset ring-slate-500/10">
      <span>
        <svg className="mr-1.5 h-2 w-2 text-gray-400 dark:text-slate-600" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3"></circle>
        </svg>
      </span>
      <span>{children}</span>
    </span>
  );
};

export { Tags, Tag, BulletTag };
