import { z } from "zod";

const EducationSchema = z.object({
  title: z.string(),
  institution: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date().optional(),
  description: z.string().optional(),
});

type Education = z.infer<typeof EducationSchema>;
const EducationArraySchema = z.array(EducationSchema);

export { type Education, EducationSchema, EducationArraySchema };
