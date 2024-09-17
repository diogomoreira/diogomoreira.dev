import path from "path";
import { ContentPath } from "../paths";
import { Project, ProjectArraySchema } from "@/models/project.model";
import { readFileSync } from "fs";

const projectsFile = path.join(process.cwd(), ContentPath.PROJECTS);

function getProjects(): Project[] {
  const projects = readFileSync(projectsFile, "utf-8");
  return ProjectArraySchema.parse(JSON.parse(projects));
}

export { getProjects };
