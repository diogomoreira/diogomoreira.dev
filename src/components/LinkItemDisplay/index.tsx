import { LinkItem } from "@/lib/content";
import styles from "@/styles/components/linkitem.module.scss";
import formatDateI18N from "@/utils/date.i18.formatter";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";

type LinkItemDisplayProps = { item: LinkItem };

const icons: Record<string, string> = {
  book: "📚",
  podcast: "🎙️",
  tvseries: "📺",
  game: "🕹️",
  music: "🎧",
};

const LinkItemDisplay: React.FC<LinkItemDisplayProps> = ({
  item,
}: LinkItemDisplayProps) => {
  const router = useRouter();
  const icon: string = icons[item.type];
  return (
    <div className={styles.linkItemContainer}>
      <div className={styles.linkItemImageContainer}>
        <a href={item.link} target="_blank" rel="noreferrer">
          <Image
            alt={item.title}
            src={`/images/links/${item.image}`}
            fill
            className={styles.linkItemImage}
          />
        </a>
      </div>
      <div className={styles.linkItemDetails}>
        <a href={item.link} target="_blank" rel="noreferrer">
          <h1>
            <span>{icon}</span> {item.title}
          </h1>
        </a>
        <div className={styles.linkItemInfo}>
          <div className={styles.linkItemDate}>
            <span>
              <FontAwesomeIcon icon={faThumbTack} />
            </span>
            <time>{formatDateI18N(item.timestamp, router.locale ?? "en")}</time>
          </div>
          <div className={styles.linkItemTags}>
            {item.tags.map((stackItem, idx) => (
              <span key={idx}>{stackItem}</span>
            ))}
          </div>
        </div>
        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
      </div>
    </div>
  );
};

export default LinkItemDisplay;
