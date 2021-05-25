import React from "react"

import kebabCase from "lodash/kebabCase"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import { GatsbyImage } from "gatsby-plugin-image"
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
import moment from "moment"

const Header = ({ title, description, date, cover, timeToRead, tags }) => {
  return (
    <>
      <HeaderImage image={cover.childImageSharp.gatsbyImageData} alt={title} />
      <Container>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderLead>{description}</HeaderLead>
        <HeaderInfo>
          <time>{moment(date).locale("pt-br").format("LL")}</time> · Leitura de{" "}
          <span className="oi oi-clock"></span> {timeToRead}{" "}
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
