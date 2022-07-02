import { LocalizedLink as Link } from "gatsby-theme-i18n";

import React from "react";
import kebabCase from "lodash.kebabcase";
import { BlogTagsContainer, TagButton } from "./styled";
import Content from "../Content";
import { StackItems } from "../../styles/global";

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
  );
};

export default BlogTags;
