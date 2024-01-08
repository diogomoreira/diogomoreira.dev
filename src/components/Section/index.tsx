import React from "react";

type SectionProps = {
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }: SectionProps) => {
  return <h2>{children}</h2>;
};

export default Section;
