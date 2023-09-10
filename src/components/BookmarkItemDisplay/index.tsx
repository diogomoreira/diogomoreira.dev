import React from "react";
import { BookmarkItem } from "@/lib/content";
import styles from "@/styles/components/bookmark.module.scss";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

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
    <div className={styles.bookmarkItemContainer}>
      <a href={item.link} target="_blank" rel="noreferrer">
        <Image alt={item.title} src={`/images/bookmarks/${item.image}`} fill className={styles.bookmarkItemImage} />
      </a>
      <div className={styles.bookmarkItemDetails}>
        <h1>
          <a href={item.link} target="_blank" rel="noreferrer">
            <span>{icon}</span> {item.title}
          </a>
        </h1>
        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
        <div className={styles.bookmarkItemInfo}>
          <div className={styles.bookmarkItemTags}>
            {item.tags.map(stackItem => (
              <span key={uuidv4()}>{stackItem}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItemDisplay;
