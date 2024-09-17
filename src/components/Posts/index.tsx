import React from "react";
import { format, formatISO } from "date-fns";
import { Article } from "@/models/article.model";

type ArticlesListProps = {
  articles: Article[];
};

type ArticleProps = { article: Article };

const ArticleItem: React.FC<ArticleProps> = ({ article }: ArticleProps) => {
  const articleDate = new Date(article.date);
  return (
    <article className="flex flex-row justify-between items-center gap-4">
      <header>
        <a href={article.path} title={article.title} target="_blank" rel="noopener noreferrer">
          <h2 className="font-bold">{article.title}</h2>
        </a>
      </header>
      <div className="flex-1 border-dashed border-b border-spring-wood-200 dark:border-neutral-800"></div>
      <time
        className="flex font-mono text-sm items-center justify-center rounded-md"
        dateTime={formatISO(articleDate, { representation: "date" })}
      >
        {format(articleDate, "PP")}
      </time>
    </article>
  );
};

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }: ArticlesListProps) => {
  return (
    <div className="grid grid-flow-row gap-6 my-6 py-2">
      {articles?.map(note => <ArticleItem key={note.path} article={note} />)}
    </div>
  );
};

export { ArticlesList, ArticleItem };
