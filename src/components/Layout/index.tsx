import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import GlobalStyle from "../../styles/global";
import Container from "../Container";
import { ToastContainer } from "react-toastify";

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
          <Container>{children}</Container>
        </SiteContent>
        <Footer />
      </BodyContainer>
    </>
  );
}
