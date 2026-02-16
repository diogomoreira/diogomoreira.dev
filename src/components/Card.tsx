import React from "react";

type CardProps = {
  children: React.ReactNode;
};

type CardTitleProps = {
  title: string;
  url: string;
};

const Card: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="border-4 rounded-lg shadow-lg border-spring-wood-200/[.5] dark:border-neutral-800/[.5] overflow-hidden">
    {children}
  </div>
);

const CardTitle: React.FC<CardTitleProps> = ({ url, title }: CardTitleProps) => (
  <h1 className="text-lg font-bold">
    <a href={url} title={title} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h1>
);

const CardBody: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="p-4 flex flex-col gap-2">{children}</div>
);

const CardParagraph: React.FC<CardProps> = ({ children }: CardProps) => (
  <p className="text-sm leading-relaxed">{children}</p>
);

const CardFooter: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="bg-spring-wood-800/5 dark:bg-white/5 p-4 text-spring-wood-600 dark:text-spring-wood-200 text-sm font-medium flex justify-between items-center">
    {children}
  </div>
);

export { Card, CardBody, CardParagraph, CardFooter, CardTitle };
