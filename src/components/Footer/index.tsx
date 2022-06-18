import Container from "components/Container"
import React from "react"
import pkgJson from "/package.json"
import { FooterContainer, FooterInfo, FooterItem } from "./styled"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <FooterContainer>
      <Container>
        <FooterInfo>
          <FooterItem>© {currentYear}</FooterItem>
          <FooterItem highlight>
            diogodmoreira.com - v{pkgJson.version}
          </FooterItem>
          <FooterItem>Termos de Uso</FooterItem>
        </FooterInfo>
      </Container>
    </FooterContainer>
  )
}

export default Footer
