import { Link } from "gatsby"
import React from "react"
import kebabCase from "lodash/kebabCase"
// import AwesomeButton from "react-awesome-button"
import { BlogTagsContainer, TagButton } from "./styled"
import Content from "components/Content"
import { StackItems } from "styles/globalStyles"

const BlogTags = ({ tags }) => {
  return (
    <BlogTagsContainer>
      <Content>Navegue por tags:</Content>
      <StackItems>
        {tags.map(tag => (
          <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
            <TagButton>{tag.fieldValue}</TagButton>
          </Link>
        ))}
      </StackItems>
    </BlogTagsContainer>
  )
}

export default BlogTags
