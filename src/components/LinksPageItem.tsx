import React from "react";
import Button from "./ui/Button";

type LinksPageItemProps = {
  icon: string | React.ReactNode;
  description: string;
  href: string;
};

const LinksPageItem: React.FC<LinksPageItemProps> = ({ icon, description, href }: LinksPageItemProps) => {
  return (
    <Button>
      <a href={href} target="_blank" rel="noreferrer">
        <div className="flex p-2 items-center gap-6 text-lg">
          <span>{icon}</span>
          <span>{description}</span>
        </div>
      </a>
    </Button>
  );
};

export default LinksPageItem;
