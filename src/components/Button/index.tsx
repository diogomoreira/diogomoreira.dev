import styles from "@/styles/buttons-theme/styles.module.scss";
import React from "react";
import { AwesomeButton } from "react-awesome-button";

type ButtonProps = {
  children: React.ReactNode;
  type: string;
  href: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  href,
}: ButtonProps) => {
  return (
    <AwesomeButton type={type} cssModule={styles} href={href}>
      {children}
    </AwesomeButton>
  );
};

export default Button;
