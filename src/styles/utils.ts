import styled from "styled-components";

export const StackItems = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;

  > * {
    flex: 1;
  }
`;
