import React from "react";

type PageDetailsProps = {
  summary: string;
  children: React.ReactNode;
};

export default function PageDetails({ summary, children }: Readonly<PageDetailsProps>) {
  return (
    <details className="shadow-md overflow-hidden rounded-md border-spring-wood-200 dark:border-neutral-900">
      <summary className="font-semibold line-clamp-1 p-4 flex gap-4">{summary}</summary>
      <p>{children}</p>
    </details>
  );
}
