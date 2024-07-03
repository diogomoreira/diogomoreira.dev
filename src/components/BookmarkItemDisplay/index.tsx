import { BookmarkItem } from "@/lib/content";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, CardTitleIcon } from "../Card";
import { Tag, Tags } from "../Tag";

type BookmarkItemDisplayProps = { item: BookmarkItem };

const icons: Record<string, string> = {
  book: "📚",
  podcast: "🎙️",
  tvseries: "📺",
  article: "📄",
  app: "📱",
  movie: "🎬",
  game: "🕹️",
  music: "🎧",
  video: "📹",
};

const BookmarkItemDisplay: React.FC<BookmarkItemDisplayProps> = ({ item }: BookmarkItemDisplayProps) => {
  const { t } = useTranslation();
  const icon: string = icons[item.type];
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
        <CardTitleIcon title={item.title} url={item.link} icon={icon} />
        <div className="text-xs text-spring-wood-500 dark:text-gray-300">
          <time>
            {t("{{val, datetime}}", {
              val: new Date(item.timestamp),
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </time>
        </div>
        <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }}></p>
        <Tags>
          {item.tags.map(stackItem => (
            <Tag key={uuidv4()}>{stackItem}</Tag>
          ))}
        </Tags>
      </CardBody>
    </Card>
  );
};

export default BookmarkItemDisplay;
