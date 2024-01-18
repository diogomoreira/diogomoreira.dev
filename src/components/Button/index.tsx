import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: () => void;
};

type LinkButtonProps = ButtonProps & {
  href: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, onKeyDown }: ButtonProps) => {
  return (
    <button onClick={onClick} onKeyDown={onKeyDown} className="button">
      {children}
    </button>
  );
};

const LinkButton: React.FC<LinkButtonProps> = ({ children, href }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <button className="link-button">{children}</button>
    </Link>
  );
};

const ExternalLinkButton: React.FC<LinkButtonProps> = ({ children, href }: LinkButtonProps) => (
  <a className="external-button" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export { Button, LinkButton, ExternalLinkButton };
