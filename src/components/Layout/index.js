import React from "react"
import NavBar from "components/NavBar"
import Footer from "components/Footer"
import GlobalStyle from "styles/globalStyles"
import { BodyContainer, SiteContent } from "./styled"
import { motion } from "framer-motion"

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <BodyContainer>
        <NavBar />
        <SiteContent initial="exit" animate="enter" exit="exit">
          {children}
        </SiteContent>
        <Footer />
      </BodyContainer>
    </>
  )
}
