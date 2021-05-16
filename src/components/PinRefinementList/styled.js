import styled from "styled-components"
import { ButtonStyle } from "styles/globalStyles"

export const PinRefinementContainer = styled.div`
  margin: 1rem 0;
`

export const PinRefinementButton = styled.button.attrs({ type: "button" })`
  ${ButtonStyle}
`

export const PinRefinementButtonLabel = styled.span`
  text-transform: lowercase;
`

export const PinRefinementButtonCount = styled.span`
  color: var(--gray-lighter);
`
