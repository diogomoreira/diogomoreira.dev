import React from "react"
import { useSiteMetadata } from "hooks/useMetadata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

export default function SocialLinks() {
  const metadata = useSiteMetadata()

  return (
    <div id="social-icons">
      <div className="d-flex social-icons-list justify-content-center gap-3">
        <a href={metadata.social.twitter} className="text-black-50 fs-1">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href={metadata.social.github} className="text-black-50 fs-1">
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <a href={metadata.social.linkedin} className="text-black-50 fs-1">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>

        <a href={metadata.social.instagram} className="text-black-50 fs-1">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  )
}
