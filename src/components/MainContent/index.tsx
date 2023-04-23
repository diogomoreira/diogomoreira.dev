import React from "react";

type MainContentProps = {
  children: React.ReactNode;
};

const MainContent: React.FC<MainContentProps> = ({
  children,
}: MainContentProps) => {
  return <main>{children}</main>;
};

export default MainContent;
