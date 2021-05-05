import React from "react"
import Navigation from "components/NavMenu"
import Footer from "components/Footer"

import "./layout.scss"

export function Layout({ children }) {
  return (
    <>
      <div className="body-class">
        <Navigation />
        <div className="site-content">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export function PageSection({ children, className }) {
  return (
    <div class={`container-fluid ${className}`}>
      <div className="container px-4">
        <div className="site-section">{children}</div>
      </div>
    </div>
  )
}
