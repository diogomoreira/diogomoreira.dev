import styled from "styled-components"

export const SearchBoxInput = styled.input`
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
`
export const SearchMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-h5);
  color: var(--secondary-text-color);
`
