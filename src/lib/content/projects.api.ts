import projects from "@/content/labs/projects.json";
import { ProjectItem } from "./content.types";

type ProjectJSONObject = {
  description: {
    [key: string]: string;
  };
  image: string;
  stack: string[];
  timestamp: string;
  title: string;
  url: string;
};

function getProjects(lang: string): ProjectItem[] {
  return (projects as ProjectJSONObject[]).map<ProjectItem>(project => {
    return {
      description: project.description[lang],
      image: project.image,
      stack: project.stack,
      timestamp: project.timestamp,
      title: project.title,
      url: project.url,
    };
  });
}

export { getProjects };
