import React from "react";
import { Button } from "../Button";

type LinksPageItemProps = {
  icon: string;
  description: string;
  href: string;
};

const LinksPageItem: React.FC<LinksPageItemProps> = ({ icon, description, href }: LinksPageItemProps) => {
  return (
    <a href={href}>
      <Button>
        <span>{icon}</span>
        <span>{description}</span>
      </Button>
    </a>
  );
};

export default LinksPageItem;
