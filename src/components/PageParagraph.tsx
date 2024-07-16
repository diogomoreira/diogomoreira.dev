import React from "react";

type PageParagraph = {
  children: React.ReactNode;
};

export default function PageParagraph({ children }: Readonly<PageParagraph>) {
  return <div className="leading-loose mb-6">{children}</div>;
}
