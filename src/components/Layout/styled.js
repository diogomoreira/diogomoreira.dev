import styled, { css } from "styled-components"

export const BodyContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

export const SiteContent = styled.div`
  margin-top: 1rem;
  flex: 1;
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom};
    `}
`
