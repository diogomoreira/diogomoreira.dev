import React from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import "./pintypelist.scss"

const PinRefinementList = ({
  items,
  currentRefinement,
  refine,
  isFromSearch,
  searchForItems,
  createURL,
}) => {
  return (
    <div>
      <div
        className="btn-group mb-3 d-none d-sm-block d-flex flex-column flex-md-row"
        role="group"
      >
        {items.map((item, i) => {
          const elementId = `${item.label}-type-btnradio`
          return (
            <button
              type="button"
              className="btn flex-grow-1 flex-md-grow-0 btn-dark"
              name={elementId}
              id={elementId}
              onClick={e => refine(item.value)}
            >
              <span className="item-label">{item.label}</span>{" "}
              <span className="item-count text-white-50">({item.count})</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default connectRefinementList(PinRefinementList)
