import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import {
  PinRefinementButton,
  PinRefinementButtonCount,
  PinRefinementButtonLabel,
  PinRefinementContainer,
} from "./styled"

const PinRefinementList = ({
  items,
  currentRefinement,
  refine,
  isFromSearch,
  searchForItems,
  createURL,
}) => {
  return (
    <PinRefinementContainer>
      {items.map((item, i) => {
        const elementId = `${item.label}-type-btnradio`
        return (
          <PinRefinementButton
            name={elementId}
            id={elementId}
            onClick={e => refine(item.value)}
          >
            <PinRefinementButtonLabel>{item.label}</PinRefinementButtonLabel>{" "}
            <PinRefinementButtonCount>({item.count})</PinRefinementButtonCount>
          </PinRefinementButton>
        )
      })}
    </PinRefinementContainer>
  )
}

export default connectRefinementList(PinRefinementList)
