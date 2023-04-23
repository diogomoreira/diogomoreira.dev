import projects from "@/content/labs/projects.json";
import { LabItem } from "./content.types";

function getLabProjects(): LabItem[] {
  return projects;
}

export { getLabProjects };
