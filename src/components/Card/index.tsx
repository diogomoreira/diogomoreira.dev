import React from "react";
import ExternalLink from "../Link/ExternalLink";

type CardProps = {
  children: React.ReactNode;
};

type CardTitleProps = {
  icon?: string;
  title: string;
  url: string;
};

const Card: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="border shadow-md border-slate-200 dark:border-slate-800 overflow-hidden">{children}</div>
);

const CardImage: React.FC<CardProps & CardTitleProps> = ({ children, url, title }: CardProps & CardTitleProps) => (
  <a href={url} title={title} target="_blank" rel="noopener noreferrer">
    <div className="aspect-video shadow-sm w-full relative">{children}</div>
  </a>
);

const CardTitle: React.FC<CardTitleProps> = ({ url, title, icon }: CardTitleProps) => (
  <div>
    <h1 className="text-lg font-bold">
      <span>{icon}</span>{" "}
      <ExternalLink url={url} title={title}>
        {title}
      </ExternalLink>
    </h1>
  </div>
);

const CardBody: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="p-4 flex flex-col gap-4">{children}</div>
);
const CardFooter: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="p-4 pt-0 text-slate-600 dark:text-slate-200 text-sm font-medium flex justify-between items-center">
    {children}
  </div>
);

export { Card, CardImage, CardTitle, CardBody, CardFooter };
