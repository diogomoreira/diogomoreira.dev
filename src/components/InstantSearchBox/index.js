import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { connectSearchBox, PoweredBy, Stats } from "react-instantsearch-dom"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import "./instant-search.scss"
import CustomPoweredBy from "./poweredBy"

const InstantSearchBox = ({ currentRefinement, refine }) => {
  return (
    <div>
      <div className="input-group pt-4 pb-2 flex-nowrap">
        <input
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          className="form-control"
          placeholder="Pesquisar..."
          aria-label="Search"
          aria-describedby="addon-wrapping"
        />
        <span className="input-group-text" id="addon-wrapping">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <div className="search-meta d-flex pb-2 fw-light">
        <Stats
          className="flex-grow-1"
          translations={{
            stats(nbHits, timeSpentMS) {
              return nbHits === 1
                ? `${nbHits} resultado encontrado em ${timeSpentMS}ms`
                : `${nbHits} resultados encontrados em ${timeSpentMS}ms`
            },
          }}
        />
        <CustomPoweredBy />
      </div>
    </div>
  )
}

export default connectSearchBox(InstantSearchBox)
