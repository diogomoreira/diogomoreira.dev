import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const threeColumnBreakPoints = {
  576: 1,
  768: 2,
  992: 3,
};

const twoColumnBreakPoints = {
  576: 1,
  768: 2,
  992: 2,
};

const oneColumnBreakPoints = {
  576: 1,
  768: 1,
  992: 1,
};

const breakpoints = [oneColumnBreakPoints, twoColumnBreakPoints, threeColumnBreakPoints];
type MasonryProps = {
  columns: number;
  children: React.ReactNode;
};

const ItemMasonry: React.FC<MasonryProps> = (props: MasonryProps) => {
  const { columns, children } = props;
  const columnBreakpoint = breakpoints[columns - 1] !== undefined ? breakpoints[columns] : oneColumnBreakPoints;
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnBreakpoint}>
      <Masonry gutter="1rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default ItemMasonry;
