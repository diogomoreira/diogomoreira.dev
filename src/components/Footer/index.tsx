import Container from "../Container";
import React from "react";
import pkgJson from "/package.json";
import SocialLinks from "../SocialLinks";
import styled from "styled-components";
import media from "styled-media-query";

const FooterContainer = styled.footer`
  margin-top: 2rem;
  font-family: var(--font-family-title);
  font-size: var(--font-size-h4);
`;

const FooterInfo = styled.div`
  border-top: var(--border-default);
  border-image-slice: var(--border-slice);
  border-image-source: var(--border-source);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  color: var(--text-color);

  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`;
const FooterItem = styled.span`
  padding: 0 1rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <Container>
        <FooterInfo>
          <FooterItem>© {currentYear}</FooterItem>
          <FooterItem>
            <SocialLinks />
          </FooterItem>
          <FooterItem>diogodmoreira.com - v{pkgJson.version}</FooterItem>
        </FooterInfo>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
