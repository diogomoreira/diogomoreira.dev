import { z } from "zod";

const WorkSchema = z.object({
  title: z.string(),
  company: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date().optional(),
  description: z.string(),
  stack: z.array(z.string()),
});

type Work = z.infer<typeof WorkSchema>;
const WorkArraySchema = z.array(WorkSchema);

export { type Work, WorkSchema, WorkArraySchema };
