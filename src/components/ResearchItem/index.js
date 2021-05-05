import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCopy,
  faWindowClose,
  faCode,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"

import "./research-item.scss"

const ResearchItem = ({ researchItem }) => {
  // Prevent ID to start with 0, which makes the accordion not working
  const researchItemId = "r" + researchItem.id
  const researchItemHeading = `heading-${researchItemId}`
  const researchItemModal = `modal-${researchItemId}`
  const researchItemElementId = `#${researchItemId}`

  const copyBibtex = bibtexCodeId => {
    const el = document.querySelector(`#${bibtexCodeId}`)
    el.select()
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
  }

  return (
    <>
      <article className="card research-item">
        <div className="card-header" id={researchItemHeading}>
          <h4>
            <button
              className="btn btn-link collapsed text-decoration-none text-dark"
              data-bs-toggle="collapse"
              data-bs-target={researchItemElementId}
              aria-expanded="false"
            >
              <time>{researchItem.year}</time> - {researchItem.title}
            </button>
          </h4>
        </div>
        <div
          id={researchItemId}
          className="collapse"
          aria-labelledby={researchItemHeading}
        >
          <div className="card-body">
            <p className="research-item-abstract card-text text-dark font-weight-light">
              {researchItem.abstract}
            </p>
            <p className="research-item-authors">
              Autores:{" "}
              {researchItem.authors.map((author, i) => (
                <span className="research-item-author">
                  {author}
                  {i < researchItem.authors.length - 1 ? `,` : ``}
                </span>
              ))}
            </p>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-dark btn-sm me-3"
              data-bs-toggle="modal"
              data-bs-target={`#${researchItemModal}`}
            >
              <FontAwesomeIcon icon={faCode} /> BibTeX
            </button>
            <a href={researchItem.url} target="_blank">
              <button type="button" className="btn btn-dark btn-sm">
                <FontAwesomeIcon icon={faDownload} /> Download
              </button>
            </a>
          </div>
        </div>
      </article>
      <div
        className="modal fade"
        id={researchItemModal}
        tabindex="-1"
        aria-labelledby={`${researchItemModal}-title`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${researchItemModal}-title`}>
                {researchItem.title}
              </h5>
            </div>
            <div className="modal-body">
              <pre id={`bibtex-${researchItemId}`}>
                <code>{researchItem.raw}</code>
              </pre>
            </div>
            <div className="modal-footer">
              <CopyToClipboard text={researchItem.raw}>
                <button type="button" className="btn btn-dark btn-sm">
                  <FontAwesomeIcon icon={faCopy} /> Copiar
                </button>
              </CopyToClipboard>
              <button
                type="button"
                className="btn btn-dark btn-sm"
                data-bs-dismiss="modal"
              >
                <FontAwesomeIcon icon={faWindowClose} /> Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResearchItem
