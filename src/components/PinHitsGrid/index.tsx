import PinItem from "components/PinItem"
import React from "react"
import { connectHits } from "react-instantsearch-dom"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { threeColumnBreakPoints } from "utils/masonry/breakpoints"

const PinHitsGrid = ({ hits }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={threeColumnBreakPoints}>
      <Masonry gutter="1rem">
        {hits.map(hit => {
          return <PinItem key={hit.objectID} {...hit} />
        })}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default connectHits(PinHitsGrid)
