import { z } from "zod";

export enum BookmarkType {
  BOOK = "book",
  PODCAST = "podcast",
  TVSERIES = "tvseries",
  ARTICLE = "article",
  APP = "app",
  MOVIE = "movie",
  GAME = "game",
  MUSIC = "music",
  VIDEO = "video",
}

const BookmarkSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  type: z.nativeEnum(BookmarkType),
  bookmarkedOn: z.string().date(),
  description: z.string({ required_error: "Description is required" }),
  tags: z.array(z.string()),
  image: z.string(),
  url: z.string().url(),
});

type Bookmark = z.infer<typeof BookmarkSchema>;
const BookmarkArraySchema = z.array(BookmarkSchema);

export { type Bookmark, BookmarkSchema, BookmarkArraySchema };
