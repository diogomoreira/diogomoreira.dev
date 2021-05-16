import {
  Card,
  CardImage,
  CardBody,
  CardFooter,
  CardTitle,
  CardDetails,
  CardHashTag,
} from "components/Card"
import React from "react"
import { StackItems } from "styles/globalStyles"

const PinItem = ({
  objectID,
  image,
  title,
  description,
  link,
  publishDate,
  tags,
}) => {
  return (
    <Card key={objectID}>
      <CardImage image={image.childImageSharp.gatsbyImageData} title={title} />
      <CardBody>
        <CardDetails date={publishDate} />
        <a href={link} target="_blank">
          <CardTitle>{title}</CardTitle>
        </a>
        <p
          className="card-text text-black-50"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardBody>
      <CardFooter>
        <StackItems>
          {tags.map((tag, i) => (
            <CardHashTag key={i}>{tag}</CardHashTag>
          ))}
        </StackItems>
      </CardFooter>
    </Card>
  )
}

export default PinItem
