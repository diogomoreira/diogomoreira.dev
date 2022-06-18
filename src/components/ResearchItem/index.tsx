import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload"
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons/faQuoteRight"
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
import { AnimatePresence } from "framer-motion"

const ResearchItem = ({ researchItem }) => {
  const preRef = React.createRef()

  const copyCitation = bibtexRef => {
    navigator.clipboard.writeText(bibtexRef.current.textContent)
  }

  return (
    <ResearchItemDetail key={researchItem.id}>
      <ResearchItemSummary>
        <span>
          <time>{researchItem.year}</time> - {researchItem.title}
        </span>
      </ResearchItemSummary>
      <ResearchItemContent animate={{ y: ["50%", "0%"], opacity: ["0", "1"] }}>
        <p>{researchItem.abstract}</p>
        <ResearchItemAuthors>
          <span>Autores</span>:{" "}
          {researchItem.authors.map((author, i) => (
            <ResearchItemAuthor key={i}>{author}</ResearchItemAuthor>
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
