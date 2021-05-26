import React from "react"
import * as S from "./styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
      {date && (
        <S.CardDate>
          {format(new Date(date), "dd 'de' LLLL 'de' yyyy", { locale: ptBR })}
        </S.CardDate>
      )}
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
