import React from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import GlobalStyle from "styles/globalStyles";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const BodyContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export const SiteContent = styled(motion.div).attrs({
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: { y: 5, opacity: 0 },
  },
})`
  margin-top: 2rem;
  flex: 1;
`;

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
  );
}
