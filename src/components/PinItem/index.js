import {
  Card,
  CardImage,
  CardBody,
  CardFooter,
  CardTitle,
  CardDetails,
  CardHashTag,
} from "components/Card"
import moment from "moment"
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
      <a href={link} target="_blank">
        <CardImage
          image={image.childImageSharp.gatsbyImageData}
          title={title}
        />
      </a>
      <CardBody>
        <CardDetails date={publishDate} />
        <a href={link} target="_blank" rel="nofollow">
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
