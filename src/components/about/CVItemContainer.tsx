import React from "react";

type CVItemContainerProps = { children: React.ReactNode };

export default function CVItemContainer({ children }: Readonly<CVItemContainerProps>) {
  return <div className="flex flex-col divide-y divide-spring-wood-200 dark:divide-neutral-800">{children}</div>;
}
