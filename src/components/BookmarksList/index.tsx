import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import { FiveColumnsMaxBreakpoints } from "@/utils/masonry.columns";
import BookmarkItemDisplay from "../BookmarkItemDisplay";
import { BookmarkItem } from "@/lib/content";

type BookmarksListProps = {
  links: BookmarkItem[];
};

const BookmarksList: React.FC<BookmarksListProps> = ({ links }: BookmarksListProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={FiveColumnsMaxBreakpoints}>
      <Masonry gutter="1rem">
        {links.map(item => (
          <BookmarkItemDisplay key={uuidv4()} item={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default BookmarksList;
