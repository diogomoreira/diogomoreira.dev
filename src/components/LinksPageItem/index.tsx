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
      <div className="flex p-2 items-center gap-4 text-lg">
        <span>{icon}</span>
        <span>{description}</span>
      </div>
    </ExternalLinkButton>
  );
};

export default LinksPageItem;
