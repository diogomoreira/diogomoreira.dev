import React from "react";
import styled from "styled-components";

const StyledTag = styled.span`
  background-color: var(--tag-background);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
  color: var(--tag-foreground);
  margin: 0 0.25rem;
`;

const Tag = ({ children }) => {
  return <StyledTag>{children}</StyledTag>;
};

export default Tag;
