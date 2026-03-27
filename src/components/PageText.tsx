import React from "react";

const PageText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="leading-loose my-6">{children}</p>;
};

export default PageText;
