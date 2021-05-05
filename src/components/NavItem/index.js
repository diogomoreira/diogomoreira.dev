import React from "react"
import { Link } from "gatsby"

const NavItem = ({ name, link }) => {
  return (
    <li className="nav-item align-bottom">
      <Link
        to={link}
        className="nav-link"
        partiallyActive={true}
        activeClassName="active"
      >
        {name}
      </Link>
    </li>
  )
}

export default NavItem
