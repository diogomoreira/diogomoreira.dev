import React from "react"
import { useSiteMetadata } from "hooks/useMetadata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin"
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram"
import { SocialLink, SocialLinksContainer } from "./styled"

export default function SocialLinks() {
  const metadata = useSiteMetadata()
  return (
    <SocialLinksContainer>
      <SocialLink href={metadata.social.twitter}>
        <FontAwesomeIcon icon={faTwitter} />
        <span>Twitter</span>
      </SocialLink>
      <SocialLink href={metadata.social.github}>
        <FontAwesomeIcon icon={faGithub} />
        <span>Github</span>
      </SocialLink>

      <SocialLink href={metadata.social.linkedin}>
        <FontAwesomeIcon icon={faLinkedin} />
        <span>LinkedIn</span>
      </SocialLink>

      <SocialLink href={metadata.social.instagram}>
        <FontAwesomeIcon icon={faInstagram} />
        <span>Instagram</span>
      </SocialLink>
    </SocialLinksContainer>
  )
}
