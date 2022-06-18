import React from "react"

import kebabCase from "lodash.kebabcase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Container from "components/Container"
import {
  HeaderImage,
  HeaderInfo,
  HeaderLead,
  HeaderTagLink,
  HeaderTags,
  HeaderTitle,
} from "./styled"
import { StackItems } from "styles/globalStyles"

const Header = ({ title, description, date, cover, timeToRead, tags }) => {
  return (
    <>
      <HeaderImage image={cover.childImageSharp.gatsbyImageData} alt={title} />
      <Container>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderLead>{description}</HeaderLead>
        <HeaderInfo>
          <time>
            {format(new Date(date), "dd 'de' LLLL 'de' yyyy", { locale: ptBR })}
          </time>{" "}
          · Leitura de <span className="oi oi-clock"></span> {timeToRead}{" "}
          {timeToRead > 1 ? `minutos` : `minuto`}
        </HeaderInfo>
        <HeaderTags>
          <StackItems>
            <FontAwesomeIcon icon={faTags} />
            {tags.map((tag, i) => (
              <HeaderTagLink key={i} to={`/tags/${kebabCase(tag)}`}>
                {tag}
              </HeaderTagLink>
            ))}
          </StackItems>
        </HeaderTags>
      </Container>
    </>
  )
}

export default Header
