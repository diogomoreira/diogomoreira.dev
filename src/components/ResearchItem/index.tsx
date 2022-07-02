import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons/faQuoteRight";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ResearchItemDetail = styled(motion.details).attrs({
  variants: {
    enter: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 5,
      opacity: 0,
    },
  },
})`
  margin-bottom: 1rem;
  overflow: hidden;
  border: var(--border-default);
  border-radius: var(--border-radius);
  border-color: var(--border-color);
`;

const ResearchItemSummary = styled.summary`
  font-size: var(--font-size-h3);
  background-color: var(--secondary-color);
  padding: 0.75rem 1rem;
  ::marker {
    content: "📄";
  }
  span {
    margin-left: 1rem;
    font-weight: var(--font-weight-bold);
  }
`;

const ResearchItemContent = styled(motion.div)`
  padding: 1rem;
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-base);
  text-align: justify;
`;

const ResearchItemAuthors = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid var(--border-color);
  font-weight: var(--font-weight-bold);
  padding-top: 0.5rem;
`;

const ResearchItemAuthor = styled.span`
  :not(:last-child) {
    ::after {
      content: ", ";
    }
  }
`;

const ResearchItemFooter = styled.footer`
  display: flex;
  background-color: var(--secondary-color);
  padding: 1rem;
  gap: var(--gap);
`;

const ResearchItemBibTex = styled.pre`
  display: none;
`;

const ResearchItemButton = styled.button.attrs({ type: "button" })`
  border-color: var(--button-border);
  background-color: var(--button-background);
  padding: 0.75rem 1rem;
  display: inline-block;
  border: var(--border-width);
  cursor: pointer;
  border-radius: var(--border-radius);
  font-size: var(--font-size-h4);
  /* font-weight: var(--font-weight-bold); */
  color: var(--button-foreground);
  svg {
    margin-right: 0.5rem;
  }
  a {
    color: var(--button-foreground);
    text-decoration: none;
  }
`;

export type ResearchItemProps = {
  title: string;
  abstract: string;
  authors: string;
  doi: string;
  url: string;
  year: string;
  journal: string;
  booktitle: string;
  id: string;
  raw: string;
};

const ResearchItem = ({ researchItem }) => {
  const preRef = React.createRef();
  const { t } = useTranslation();
  const copyCitation = (bibtexRef: string) => {
    navigator.clipboard.writeText(bibtexRef.current.textContent);
    toast(`"${researchItem.title}" ${t("academic.copied")}`);
  };
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
          <span>{t("academic.authors")}</span>:{" "}
          {researchItem.authors.map((author, i) => (
            <ResearchItemAuthor key={i}>{author}</ResearchItemAuthor>
          ))}
        </ResearchItemAuthors>
      </ResearchItemContent>
      <ResearchItemFooter>
        <ResearchItemButton onClick={e => copyCitation(preRef)}>
          <FontAwesomeIcon icon={faQuoteRight} /> {t("academic.copycitation")} (BibTeX)
        </ResearchItemButton>
        <ResearchItemBibTex ref={preRef}>{researchItem.raw}</ResearchItemBibTex>

        <ResearchItemButton>
          <a href={researchItem.url} target="_blank">
            <FontAwesomeIcon icon={faDownload} /> Download
          </a>
        </ResearchItemButton>
      </ResearchItemFooter>
    </ResearchItemDetail>
  );
};

export default ResearchItem;
