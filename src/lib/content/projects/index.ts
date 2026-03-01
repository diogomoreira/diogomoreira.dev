import { Project, ProjectArraySchema } from "@/models/project.model";
import { readFileSync } from "fs";
import path from "path";
import { ContentPath } from "../paths";

const projectsFile = path.join(process.cwd(), ContentPath.PROJECTS);

function getProjects(): Project[] {
  const projects = readFileSync(projectsFile, "utf-8");
  if (projects) {
    const projectsObject = JSON.parse(projects);
    if (Array.isArray(projectsObject) && projectsObject.length) {
      return ProjectArraySchema.parse(projectsObject);
    }
  }
  return [];
}

export { getProjects };
