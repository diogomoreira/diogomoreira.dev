import React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCopy,
  faWindowClose,
  faCode,
  faDownload,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons"
import {
  ResearchItemAuthor,
  ResearchItemAuthors,
  ResearchItemBibTex,
  ResearchItemButton,
  ResearchItemContent,
  ResearchItemCopyTooltip,
  ResearchItemDetail,
  ResearchItemFooter,
  ResearchItemSummary,
} from "./styled"
import ReactTooltip from "react-tooltip"

const ResearchItem = ({ researchItem }) => {
  console.log(researchItem.id)
  const preRef = React.createRef()

  const copyCitation = bibtexRef => {
    navigator.clipboard.writeText(bibtexRef.current.textContent)
    console.log(bibtexRef.current.textContent)
  }

  return (
    <ResearchItemDetail key={researchItem.id}>
      <ResearchItemSummary>
        <span>
          <time>{researchItem.year}</time> - {researchItem.title}
        </span>
      </ResearchItemSummary>
      <ResearchItemContent>
        <p>{researchItem.abstract}</p>
        <ResearchItemAuthors>
          <span>Autores</span>:{" "}
          {researchItem.authors.map(author => (
            <ResearchItemAuthor>{author}</ResearchItemAuthor>
          ))}
        </ResearchItemAuthors>
      </ResearchItemContent>
      <ResearchItemFooter className="card-footer">
        <ResearchItemButton onClick={e => copyCitation(preRef)}>
          <FontAwesomeIcon icon={faQuoteRight} /> Copiar citação (BibTeX)
        </ResearchItemButton>
        <ResearchItemBibTex ref={preRef}>{researchItem.raw}</ResearchItemBibTex>
        <a href={researchItem.url} target="_blank">
          <ResearchItemButton type="button">
            <FontAwesomeIcon icon={faDownload} /> Download
          </ResearchItemButton>
        </a>
      </ResearchItemFooter>
    </ResearchItemDetail>
  )
}

export default ResearchItem
