import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: () => void;
};

const baseClasses =
  "bg-spring-wood-200 hover:bg-spring-wood-300 duration-200 hover:duration-200 dark:bg-neutral-950 dark:hover:bg-black py-2 px-4 rounded-md shadow-sm font-medium text-sm";

type LinkButtonProps = ButtonProps & {
  href: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, onKeyDown }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} onKeyDown={onKeyDown} className={baseClasses}>
      {children}
    </button>
  );
};

const ExternalLinkButton: React.FC<LinkButtonProps> = ({ children, href }: LinkButtonProps) => (
  <a className={baseClasses} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export { Button, ExternalLinkButton };
