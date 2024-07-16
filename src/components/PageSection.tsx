import React from "react";

type PageSectionProps = {
  children: React.ReactNode;
};

export default function PageSection({ children }: Readonly<PageSectionProps>) {
  return (
    <h2 className="text-2xl pb-2 my-6 tracking-tight font-bold flex justify-between border-b border-spring-wood-200 dark:border-gray-600">
      {children}
    </h2>
  );
}
