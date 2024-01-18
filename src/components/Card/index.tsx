import React from "react";
import a from "../Link/a";

type CardProps = {
  children: React.ReactNode;
};

type CardTitleProps = {
  title: string;
  url: string;
};

type CardTitleIconProps = CardTitleProps & {
  icon?: string;
};

const Card: React.FC<CardProps> = ({ children }: CardProps) => <div className="card">{children}</div>;

const CardImage: React.FC<CardProps & CardTitleProps> = ({ children, url, title }: CardProps & CardTitleProps) => (
  <div className="card-figure">{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ url, title, icon }: CardTitleProps) => (
  <h1 className="card-title">
    <a href={url} title={title} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h1>
);

const CardTitleIcon: React.FC<CardTitleIconProps> = ({ url, title, icon }: CardTitleProps) => (
  <h1 className="card-title">
    <span>{icon}</span>
    <a href={url} title={title} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h1>
);

const CardBody: React.FC<CardProps> = ({ children }: CardProps) => <div className="card-body">{children}</div>;
const CardFooter: React.FC<CardProps> = ({ children }: CardProps) => <div className="card-footer">{children}</div>;

export { Card, CardImage, CardTitle, CardTitleIcon, CardBody, CardFooter };
