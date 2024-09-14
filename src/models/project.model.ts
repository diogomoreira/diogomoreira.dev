import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  lastUpdate: z.string().date(),
  description: z.string({ required_error: "Description is required" }),
  stack: z.array(z.string({ required_error: "Stack is required" })),
  image: z.string(),
  url: z.string().url(),
});

type Project = z.infer<typeof ProjectSchema>;
const ProjectArraySchema = z.array(ProjectSchema);

export { type Project, ProjectSchema, ProjectArraySchema };
