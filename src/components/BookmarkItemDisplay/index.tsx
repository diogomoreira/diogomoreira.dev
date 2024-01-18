import React from "react";
import { BookmarkItem } from "@/lib/content";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, CardImage, CardTitle, CardTitleIcon } from "../Card";
import { Tag, Tags } from "../Tag";
import { useTranslation } from "next-i18next";

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
        <div className="card-meta">
          <time>
            {t("{{val, datetime}}", {
              val: new Date(item.timestamp),
              formatParams: {
                val: { year: "numeric", month: "long", day: "numeric" },
              },
            })}
          </time>
        </div>
        <p className="card-text" dangerouslySetInnerHTML={{ __html: item.description }}></p>
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
