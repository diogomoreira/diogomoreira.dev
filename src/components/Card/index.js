import { Link } from "gatsby"
import React from "react"
import * as S from "./styled"
import { GatsbyImage } from "gatsby-plugin-image"

const CardTitle = S.CardTitle
const Card = S.Card
const CardInfo = S.CardInfo
const CardFooter = S.CardFooter
const CardHashTag = S.CardHashTag
const CardLinkHashTag = S.CardLinkHashTag
const CardBody = S.CardBody

function CardImage({ image, title }) {
  return (
    <S.CardImage>
      <GatsbyImage image={image} alt={title} />
    </S.CardImage>
  )
}

function CardDetails({ timeToRead, date }) {
  return (
    <S.CardDetails>
      {timeToRead && (
        <S.CardTimeToRead>
          {timeToRead} {timeToRead > 1 ? `minutos` : `minuto`}
        </S.CardTimeToRead>
      )}
      {date && <S.CardDate>{date}</S.CardDate>}
    </S.CardDetails>
  )
}

export {
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardDetails,
  CardInfo,
  CardFooter,
  CardHashTag,
  CardLinkHashTag,
}
