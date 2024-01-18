import React from "react";

const PageFigure: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <figure className="relative w-full h-96 shadow-md">{children}</figure>;
};

export default PageFigure;
