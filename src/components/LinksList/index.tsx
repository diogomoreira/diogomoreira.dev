import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import { ThreeColumnsMaxBreakpoints } from "@/utils/masonry.columns";
import LinkItemDisplay from "../LinkItemDisplay";
import { LinkItem } from "@/lib/content";

type LinksListProps = {
  links: LinkItem[];
};

const LinksList: React.FC<LinksListProps> = ({ links }: LinksListProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={ThreeColumnsMaxBreakpoints}>
      <Masonry gutter="1rem">
        {links.map(item => (
          <LinkItemDisplay key={uuidv4()} item={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default LinksList;
