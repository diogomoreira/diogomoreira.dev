import { z } from "zod";

const PaperSchema = z.object({
  abstract: z.string(),
  author: z.array(z.string()),
  doi: z.string(),
  id: z.string(),
  title: z.string(),
  url: z.string(),
  year: z.preprocess(arg => Number(arg), z.number()),
  media: z.string(),
});

type Paper = z.infer<typeof PaperSchema>;
const PaperArraySchema = z.array(PaperSchema);

export { type Paper, PaperSchema, PaperArraySchema };
