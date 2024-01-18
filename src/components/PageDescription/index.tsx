import React from "react";

const PageDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="mx-auto md:px-0 mt-2 text-slate-500 dark:text-slate-300 leading-loose mb-6">{children}</p>;
};

export default PageDescription;
