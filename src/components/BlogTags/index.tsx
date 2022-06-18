import { Link } from "gatsby"
import React from "react"
import kebabCase from "lodash.kebabcase"
import { BlogTagsContainer, TagButton } from "./styled"
import Content from "components/Content"
import { StackItems } from "styles/globalStyles"

const BlogTags = ({ tags }) => {
  return (
    <BlogTagsContainer>
      <Content>Navegue por tags:</Content>
      <StackItems>
        {tags.map((tag, i) => (
          <Link key={i} to={`/tags/${kebabCase(tag.fieldValue)}`}>
            <TagButton>{tag.fieldValue}</TagButton>
          </Link>
        ))}
      </StackItems>
    </BlogTagsContainer>
  )
}

export default BlogTags
