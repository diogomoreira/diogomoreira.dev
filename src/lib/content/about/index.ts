import { Work, WorkArraySchema } from "@/models/work.model";
import { ContentPath } from "../paths";
import path from "path";
import { readFileSync } from "fs";
import { Education, EducationArraySchema } from "@/models/education.model";

const educationFile = path.join(process.cwd(), ContentPath.EDUCATION);
const workExperienceFile = path.join(process.cwd(), ContentPath.WORK_EXPERIENCE);

function getWorkExperience(): Work[] {
  return WorkArraySchema.parse(JSON.parse(readFileSync(workExperienceFile, "utf-8")));
}

function getEducation(): Education[] {
  return EducationArraySchema.parse(JSON.parse(readFileSync(educationFile, "utf-8")));
}

export { getWorkExperience, getEducation };
