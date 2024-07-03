import React from "react";

type CardProps = {
  children: React.ReactNode;
};

type CardTitleProps = {
  title: string;
  url: string;
};

type CardTitleIconProps = CardTitleProps & {
  icon: string;
};

const Card: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="border rounded-md shadow-lg border-spring-wood-200 dark:border-neutral-800 overflow-hidden">
    {children}
  </div>
);

const CardImage: React.FC<CardProps & CardTitleProps> = ({ children }: CardProps & CardTitleProps) => (
  <div className="card-figure">{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ url, title }: CardTitleProps) => (
  <h1 className="text-lg font-bold">
    <a href={url} title={title} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h1>
);

const CardTitleIcon: React.FC<CardTitleIconProps> = ({ url, title, icon }: CardTitleIconProps) => (
  <h1 className="text-lg font-bold">
    <span className="mr-2">{icon}</span>
    <a href={url} title={title} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h1>
);

const CardBody: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="p-4 flex flex-col gap-2">{children}</div>
);
const CardFooter: React.FC<CardProps> = ({ children }: CardProps) => (
  <div className="p-4 pt-0 text-spring-wood-600 dark:text-spring-wood-200 text-sm font-medium flex justify-between items-center">
    {children}
  </div>
);

export { Card, CardBody, CardFooter, CardImage, CardTitle, CardTitleIcon };
