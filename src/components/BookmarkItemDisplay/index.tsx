import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, CardFooter, CardTitle } from "../Card";
import { Tag, Tags } from "../Tag";
import { Bookmark } from "@/models/bookmark.model";
import { IconType } from "react-icons";
import {
  FaBook,
  FaFile,
  FaFilm,
  FaGamepad,
  FaHeadphones,
  FaMicrophone,
  FaMobileScreen,
  FaTv,
  FaVideo,
} from "react-icons/fa6";

type BookmarkItemDisplayProps = { item: Bookmark };

const icons: Map<string, IconType> = new Map([
  ["book", FaBook],
  ["podcast", FaMicrophone],
  ["tvseries", FaTv],
  ["article", FaFile],
  ["app", FaMobileScreen],
  ["movie", FaFilm],
  ["game", FaGamepad],
  ["music", FaHeadphones],
  ["video", FaVideo],
]);

const BookmarkItemDisplay: React.FC<BookmarkItemDisplayProps> = ({ item }: BookmarkItemDisplayProps) => {
  const { t } = useTranslation();
  const CardIcon = icons.get(item.type)!;
  return (
    <Card>
      <a href={item.link} title={item.title} target="_blank" rel="noopener noreferrer">
        <Image
          className="object-contain"
          alt={item.title}
          src={`/images/bookmarks/${item.image}`}
          width={1920}
          height={1080}
        />
      </a>
      <CardBody>
        <CardTitle title={item.title} url={item.link} />
        <div className="text-xs text-spring-wood-500 dark:text-gray-300">
          <time>
            {t("{{val, datetime}}", {
              val: new Date(item.date),
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </time>
        </div>
        <p className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }}></p>
      </CardBody>
      <CardFooter>
        {item.type && <CardIcon className="w-5 h-5" />}
        <Tags>
          {item.tags.map(stackItem => (
            <Tag key={uuidv4()}>{stackItem}</Tag>
          ))}
        </Tags>
      </CardFooter>
    </Card>
  );
};

export default BookmarkItemDisplay;
