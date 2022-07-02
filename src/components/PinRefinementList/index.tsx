import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import styled from "styled-components";
import { ButtonStyle } from "../../styles/global";

const PinRefinementContainer = styled.div`
  margin: 1rem 0;
`;

const PinRefinementButton = styled.button.attrs({ type: "button" })`
  ${ButtonStyle}
  padding: 0.5rem;
`;

const PinRefinementButtonLabel = styled.span`
  text-transform: lowercase;
`;

const PinRefinementButtonCount = styled.span`
  color: var(--gray-white);
`;

const PinRefinementList = ({ items, currentRefinement, refine, isFromSearch, searchForItems, createURL }) => {
  return (
    <PinRefinementContainer>
      {items.map((item, i) => {
        const elementId = `${item.label}-type-btnradio`;
        return (
          <PinRefinementButton key={i} name={elementId} id={elementId} onClick={e => refine(item.value)}>
            <PinRefinementButtonLabel>{item.label}</PinRefinementButtonLabel>{" "}
            <PinRefinementButtonCount>({item.count})</PinRefinementButtonCount>
          </PinRefinementButton>
        );
      })}
    </PinRefinementContainer>
  );
};

export default connectRefinementList(PinRefinementList);
