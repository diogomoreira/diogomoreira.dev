import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--viewport-lg-max);
`;

const ContainerFluid = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
`;

export default Container;
export { ContainerFluid };
