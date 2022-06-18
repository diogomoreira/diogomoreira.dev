import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectPoweredBy } from "react-instantsearch-dom"
import { faAlgolia } from "@fortawesome/free-brands-svg-icons/faAlgolia"

const PoweredBy = ({ url }) => (
  <div>
    Powered by{" "}
    <a href={url} className="text-dark">
      <b>Algolia</b> <FontAwesomeIcon icon={faAlgolia} />
    </a>
  </div>
)

const CustomPoweredBy = connectPoweredBy(PoweredBy)
export default CustomPoweredBy
