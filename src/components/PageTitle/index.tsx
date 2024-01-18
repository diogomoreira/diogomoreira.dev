import React from "react";

const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h1 className="text-4xl mb-6 font-bold">{children}</h1>;
};

export default PageTitle;
