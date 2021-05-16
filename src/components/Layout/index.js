import React from "react"
import NavBar from "components/NavBar"
import Footer from "components/Footer"
import GlobalStyle from "styles/globalStyles"
import { BodyContainer, SiteContent } from "./styled"

export function Layout(props) {
  return (
    <>
      <GlobalStyle />
      <BodyContainer>
        <NavBar />
        <SiteContent {...props}>{props.children}</SiteContent>
        <Footer />
      </BodyContainer>
    </>
  )
}
