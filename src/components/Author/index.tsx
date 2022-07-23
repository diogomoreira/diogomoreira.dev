import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { LocalizedLink as Link } from "gatsby-theme-i18n";
import Content from "../Content";
import { useSiteMetadata } from "../../hooks/useMetadata";
import { motion } from "framer-motion";
import styled from "styled-components";
import media from "styled-media-query";
import { Trans, useTranslation } from "react-i18next";

export const AuthorContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  justify-items: center;
  gap: 5%;

  ${media.lessThan("medium")`
    flex-direction: column;
    align-items: center;
  `}
`;

export const AuthorProfileText = styled.div`
  p:first-child {
    ${media.lessThan("medium")`
        text-align: center;
    `}
  }

  min-width: 70%;
  ${Content} {
    margin-top: 0;
  }
`;

export const AuthorTitle = styled.h1`
  font-weight: 600;
  ${media.greaterThan("medium")`
    font-size: calc(var(--font-size-h1) * 2) !important;
    margin: 0px !important;
  `}

  ${media.lessThan("medium")`
    font-size: var(--font-size-h1);
    text-transform: uppercase;
    text-align: center;
    margin: 0px !important;
  `}
`;

export const AuthorHeadline = styled.p`
  font-size: var(--font-size-h1);
  ${media.lessThan("medium")`
    font-size: var(--font-size-h2);
    text-align: center;
  `}
  color: var(--link-color) !important;
  font-weight: var(--font-weight-bold);
`;

export const AuthorAvatar = styled(motion.div).attrs({
  variants: {
    enter: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0.5,
      opacity: 0,
    },
  },
})`
  max-width: 25%;
  margin: 2rem auto;
  position: relative;
  flex: 1 0 auto;

  ${media.lessThan("medium")`
    max-width: 60%;
    margin-bottom: 2rem;
  `}

  .gatsby-image-wrapper {
    border-radius: 50%;
    border: 5px solid var(--white);
    outline: 2px solid var(--border-color);
  }
`;

const Author: React.FC = () => {
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "profile_photo_index.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 350, height: 350)
        }
      }
    }
  `);
  const metadata = useSiteMetadata();
  const { t } = useTranslation();
  return (
    <AuthorContainer>
      <AuthorAvatar>
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={metadata.title} />
      </AuthorAvatar>
      <AuthorProfileText>
        <p>{t("index.present")}</p>
        <AuthorTitle>{metadata.author.name} 👋🏻</AuthorTitle>
        <AuthorHeadline>{t("index.titles")}</AuthorHeadline>
        <Content>
          <p>
            <Trans
              i18nKey="index.text.professional"
              values={{
                ifpb: t("index.ifpb"),
              }}
              components={{
                ifpbLink: <a title={t("index.ifpb")} href="https://ifpb.edu.br" />,
              }}></Trans>
          </p>
          <p>
            <Trans
              i18nKey="index.text.personal"
              components={{
                blogRef: <Link to="/blog" />,
                linkRef: <Link to="/links" />,
              }}></Trans>
          </p>
        </Content>
      </AuthorProfileText>
    </AuthorContainer>
  );
};

export default Author;
