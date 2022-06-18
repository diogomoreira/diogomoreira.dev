import styled from "styled-components"
import { ButtonStyle } from "styles/globalStyles"

export const BlogTagsContainer = styled.div`
  margin: 1rem 0;
`

export const TagButton = styled.button.attrs({ type: "button" })`
  ${ButtonStyle}
  ::before {
    content: "#";
  }
`
