import { z } from "zod";

const BookmarkType = z.enum(["book", "podcast", "tvseries", "article", "app", "movie", "game", "music", "video"]);

const BookmarkSchema = z.object({
  description: z.string(),
  image: z.string(),
  link: z.string(),
  tags: z.array(z.string()),
  date: z.string().date(),
  title: z.string(),
  type: BookmarkType,
});

type BookmarkType = z.infer<typeof BookmarkType>;
type Bookmark = z.infer<typeof BookmarkSchema>;
const BookmarkArraySchema = z.array(BookmarkSchema);

export { type Bookmark, type BookmarkType, BookmarkSchema, BookmarkArraySchema };
