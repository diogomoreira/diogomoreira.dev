import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: () => void;
};

type LinkButtonProps = ButtonProps & {
  href: string;
};

const styleClasses =
  "flex items-center rounded-sm bg-gray-50 p-2 text-sm font-medium bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-200";

const Button: React.FC<ButtonProps> = ({ children, className, onClick, onKeyDown }: ButtonProps) => {
  return (
    <button onClick={onClick} onKeyDown={onKeyDown} className={styleClasses.concat(" ").concat(className ?? "")}>
      {children}
    </button>
  );
};

const LinkButton: React.FC<LinkButtonProps> = ({ children, href }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <button className={styleClasses}>{children}</button>
    </Link>
  );
};

const ExternalLinkButton: React.FC<LinkButtonProps> = ({ children, href }: LinkButtonProps) => (
  <a className={styleClasses} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export { Button, LinkButton, ExternalLinkButton };
