import React from "react";
import { connectSearchBox, PoweredBy, Stats } from "react-instantsearch-dom";

import styled from "styled-components";

const SearchBoxInput = styled.input`
  width: 100%;
  height: 3rem;
  font-size: 1.25rem;
  margin: 1rem 0;
  color: var(--input-text-color);
  font-weight: 700;
  padding: 1rem;
  border: var(--border-default-width) var(--border-color);
  background-color: var(--input-background-color);
  border-radius: 0;
  appearance: none;
`;
const SearchMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-h5);
  color: var(--secondary-text-color);
`;

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
      />
      <SearchMeta>
        <Stats
          translations={{
            stats(nbHits, timeSpentMS) {
              return nbHits === 1
                ? `${nbHits} resultado encontrado em ${timeSpentMS}ms`
                : `${nbHits} resultados encontrados em ${timeSpentMS}ms`;
            },
          }}
        />
      </SearchMeta>
    </>
  );
};

export default connectSearchBox(InstantSearchBox);
