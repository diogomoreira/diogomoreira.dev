import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { v4 as uuidv4 } from "uuid";
import { ThreeColumnsMaxBreakpoints } from "@/utils/masonry.columns";
import BookmarkItemDisplay from "../BookmarkItemDisplay";
import { Bookmark } from "@/models/bookmark.model";

type BookmarksListProps = {
  links: Bookmark[];
};

const BookmarksList: React.FC<BookmarksListProps> = ({ links }: BookmarksListProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={ThreeColumnsMaxBreakpoints}>
      <Masonry gutter="0.75rem">
        {links.map(item => (
          <BookmarkItemDisplay key={uuidv4()} item={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default BookmarksList;
