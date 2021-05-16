import { Link } from "gatsby"
import React from "react"
import kebabCase from "lodash/kebabCase"
// import AwesomeButton from "react-awesome-button"
import { BlogTagsContainer, TagButton } from "./styled"
import Content from "components/Content"

const BlogTags = ({ tags }) => {
  return (
    <BlogTagsContainer>
      <Content>Navegue por tags:</Content>
      {tags.map(tag => (
        <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
          <TagButton>{tag.fieldValue}</TagButton>
        </Link>
      ))}
    </BlogTagsContainer>
  )
}

export default BlogTags
