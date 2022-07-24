import React from "react";
import { useSiteMetadata } from "../../hooks/useMetadata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import media from "styled-media-query";
import styled from "styled-components";

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  ${media.lessThan("medium")`
    max-width: 100%;
    margin: 1rem auto;
    flex-direction: column;
  `}
`;

const SocialLink = styled.a.attrs({ target: "_blank", rel: "nofollow" })`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLinks = () => {
  const metadata = useSiteMetadata();
  return (
    <SocialLinksContainer>
      <SocialLink href={metadata.social.twitter}>
        <FontAwesomeIcon icon={faTwitter} />
      </SocialLink>
      <SocialLink href={metadata.social.github}>
        <FontAwesomeIcon icon={faGithub} />
      </SocialLink>
      <SocialLink href={metadata.social.linkedin}>
        <FontAwesomeIcon icon={faLinkedin} />
      </SocialLink>
      <SocialLink href={metadata.social.instagram}>
        <FontAwesomeIcon icon={faInstagram} />
      </SocialLink>
    </SocialLinksContainer>
  );
};

export default SocialLinks;
