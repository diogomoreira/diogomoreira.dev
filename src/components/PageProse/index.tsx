import React from "react";

const PageProse: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mt-8 prose max-w-none prose-slate mx-auto dark:prose-invert md:px-0">{children}</div>;
};

export default PageProse;
