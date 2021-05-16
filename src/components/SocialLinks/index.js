import React from "react"
import { useSiteMetadata } from "hooks/useMetadata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { SocialLink, SocialLinksContainer } from "./styled"

export default function SocialLinks() {
  const metadata = useSiteMetadata()
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
  )
}
