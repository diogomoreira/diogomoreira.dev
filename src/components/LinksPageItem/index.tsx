import React from "react";
import { ExternalLinkButton } from "../Button";

type LinksPageItemProps = {
  icon: string | React.ReactNode;
  description: string;
  href: string;
};

const LinksPageItem: React.FC<LinksPageItemProps> = ({ icon, description, href }: LinksPageItemProps) => {
  return (
    <ExternalLinkButton href={href}>
      <div className="links-item">
        <span>{icon}</span>
        <span>{description}</span>
      </div>
    </ExternalLinkButton>
  );
};

export default LinksPageItem;
