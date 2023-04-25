import links from "@/content/links/links.json";
import { LinkItem } from "@/lib/content";

export function getLinks(): LinkItem[] {
  return links
    .map<LinkItem>(link => ({
      title: link.title,
      type: link.type,
      link: link.link,
      description: link.description,
      image: link.image,
      timestamp: link.publishDate,
      tags: link.tags,
    }))
    .sort((link1, link2) => (new Date(link1.timestamp) < new Date(link2.timestamp) ? 1 : -1));
}
