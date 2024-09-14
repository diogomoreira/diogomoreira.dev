import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { Card, CardBody, CardFooter, CardParagraph, CardTitle } from "../Card";
import { Tag, Tags } from "../Tag";
import { generateUUID } from "@/utils/uuid";
import { Bookmark } from "../../models/bookmark.model";
import { format } from "date-fns";
import {
  FaBook,
  FaCircleQuestion,
  FaFilm,
  FaGamepad,
  FaMobileScreen,
  FaMusic,
  FaNewspaper,
  FaPodcast,
  FaTv,
  FaVideo,
} from "react-icons/fa6";
import { IconType } from "react-icons";

type BookmarkListProps = {
  items: Bookmark[];
};

const BookmarkList: React.FC<BookmarkListProps> = ({ items }: BookmarkListProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 divide-y divide-spring-wood-200/[.5] dark:divide-neutral-800/[.5]">
      {items.map(item => (
        <BookmarkItem key={generateUUID()} item={item} />
      ))}
    </div>
  );
};

type BookmarkItemDisplayProps = {
  item: Bookmark;
};

const BookmarkTypeIcon = new Map<string, IconType>([
  ["article", FaNewspaper],
  ["book", FaBook],
  ["podcast", FaPodcast],
  ["tvseries", FaTv],
  ["app", FaMobileScreen],
  ["movie", FaFilm],
  ["game", FaGamepad],
  ["music", FaMusic],
  ["video", FaVideo],
]);

const BookmarkItem: React.FC<BookmarkItemDisplayProps> = ({ item }: BookmarkItemDisplayProps) => {
  const { t } = useTranslation();
  const bookmarkedOnAsDate = new Date(item.bookmarkedOn);
  const bookmarkItemDate = new Date(bookmarkedOnAsDate.valueOf() + bookmarkedOnAsDate.getTimezoneOffset() * 60 * 1000);
  const Icon = BookmarkTypeIcon.get(item.type) || FaCircleQuestion;

  return (
    <article className="flex flex-col md:flex-row items-center md:items-start gap-6 py-6">
      <a href={item.url} title={item.title} target="_blank" rel="noopener noreferrer">
        <div className="relative w-60 h-full">
          <div className="absolute left-4 top-[2px] bg-neutral-950/[.95] p-2 rounded-lg rounded-tl-none rounded-tr-none text-neutral-100">
            <Icon className="w-4 h-4" />
          </div>
          <Image
            className="rounded-lg object-cover shadow-lg border-2 border-spring-wood-200 dark:border-neutral-800"
            width={500}
            height={500}
            alt={item.title}
            src={item.image}
          />
        </div>
      </a>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-lg font-bold">
          <a href={item.url} title={item.title} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        </h1>
        <time className="text-xs text-spring-wood-500 dark:text-gray-300">{format(bookmarkItemDate, "PP")}</time>
        <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
        <Tags>
          {item.tags.map(tag => (
            <Tag key={generateUUID()}>{tag}</Tag>
          ))}
        </Tags>
      </div>
      {/* <CardFooter></CardFooter> */}
    </article>
  );
};

export { BookmarkList, BookmarkItem };
