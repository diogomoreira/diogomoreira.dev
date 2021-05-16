import React from "react"
import { connectSearchBox, PoweredBy, Stats } from "react-instantsearch-dom"

import CustomPoweredBy from "./poweredBy"
import { SearchBoxInput, SearchMeta } from "./styled"

const InstantSearchBox = ({ currentRefinement, refine }) => {
  return (
    <>
      <SearchBoxInput
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        className="form-control"
        placeholder="Pesquisar..."
        aria-label="Search"
        aria-describedby="addon-wrapping"
      />
      <SearchMeta>
        <Stats
          translations={{
            stats(nbHits, timeSpentMS) {
              return nbHits === 1
                ? `${nbHits} resultado encontrado em ${timeSpentMS}ms`
                : `${nbHits} resultados encontrados em ${timeSpentMS}ms`
            },
          }}
        />
        <CustomPoweredBy />
      </SearchMeta>
    </>
  )
}

export default connectSearchBox(InstantSearchBox)
