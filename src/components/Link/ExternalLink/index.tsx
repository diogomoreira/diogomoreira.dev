import React from "react";

type ExternalLinkProps = {
  children: React.ReactNode;
  title: string;
  url: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ url, title, children }: ExternalLinkProps) => {
  return (
    <a
      className="hover:text-slate-600 dark:hover:text-slate-200"
      href={url}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
