import React from "react"

import "./footer.scss"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="container-fluid footer text-light mt-5">
      <div className="container py-4 text-center">
        <div id="footer-info">
          © {currentYear} diogodmoreira.com{" "}
          <span className="footer-item">Termos de Uso</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
