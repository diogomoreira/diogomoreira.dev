import { z } from "zod";

const PageSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  cover: z.string({ required_error: "Cover is required" }),
  published: z.string().date(),
  updated: z.string().date(),
  content: z.string(),
});

type Page = z.infer<typeof PageSchema>;

export { type Page, PageSchema };
