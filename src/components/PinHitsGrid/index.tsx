import { PinItem } from "../Item";
import React from "react";
import { connectHits } from "react-instantsearch-dom";
import ItemMasonry from "../Masonry";

const PinHitsGrid = ({ hits }) => {
  return (
    <ItemMasonry columns={3}>
      {hits.map(hit => {
        return (
          <PinItem id={hit.objectID} title={hit.title} image={hit.image} content={hit.description} tags={hit.tags} />
        );
      })}
    </ItemMasonry>
  );
};

export default connectHits(PinHitsGrid);
