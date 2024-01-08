import React from "react";
import { BookmarkItem } from "@/lib/content";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, CardImage, CardTitle } from "../Card";
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
  const icon: string = icons[item.type];
  return (
    <Card>
      <CardImage title={item.title} url={item.link}>
        <Image
          className="object-contain"
          alt={item.title}
          src={`/images/bookmarks/${item.image}`}
          width={1920}
          height={1080}
        />
      </CardImage>
      <CardBody>
        <CardTitle title={item.title} url={item.link} icon={icon} />
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
