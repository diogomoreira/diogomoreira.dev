import React from "react";

type PageTitleProps = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: Readonly<PageTitleProps>) {
  return <h1 className="text-4xl mb-6 font-bold">{children}</h1>;
}
