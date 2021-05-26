import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import kebabCase from "lodash.kebabcase"
import dashify from "dashify"

import {
  Card,
  CardBody,
  CardDetails,
  CardFooter,
  CardImage,
  CardLinkHashTag,
  CardTitle,
} from "components/Card"
import { StackItems } from "styles/globalStyles"

const BlogPostCardItem = ({
  objectID,
  description,
  title,
  cover,
  date,
  tags,
  slug,
  timeToRead,
}) => {
  return (
    <Card key={objectID}>
      <Link to={`/${slug}`}>
        <CardImage
          image={cover.childImageSharp.gatsbyImageData}
          title={title}
        />
      </Link>
      <CardBody>
        <CardDetails timeToRead={timeToRead} date={date} />
        <Link to={`/${slug}`}>
          <CardTitle>{title}</CardTitle>
        </Link>
        {description}
      </CardBody>
      <CardFooter>
        <StackItems>
          {tags &&
            tags.map((tag, i) => (
              <CardLinkHashTag key={i} to={`/tags/${kebabCase(tag)}`}>
                {tag}
              </CardLinkHashTag>
            ))}
        </StackItems>
      </CardFooter>
    </Card>
  )
}

export default BlogPostCardItem
