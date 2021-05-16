import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

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
      <CardImage image={cover.childImageSharp.gatsbyImageData} title={title} />
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
