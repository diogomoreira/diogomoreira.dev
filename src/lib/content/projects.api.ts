import projects from "@/content/labs/projects.json";
import { ProjectItem } from "./content.types";

function getProjects(): ProjectItem[] {
  return projects;
}

export { getProjects };
