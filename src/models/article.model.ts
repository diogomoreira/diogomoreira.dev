import { locales } from "@/config";
import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  path: z.string(),
  content: z.string(),
  cover: z.string({ required_error: "Cover is required" }),
  date: z.string().date(),
  lang: z.enum([locales.en.code, locales.pt.code]),
  comments: z.boolean(),
  tags: z.array(z.string({ required_error: "Tags is required" })),
});

type Article = z.infer<typeof ArticleSchema>;
const ArticleArraySchema = z.array(ArticleSchema);

export { type Article, ArticleSchema, ArticleArraySchema };
