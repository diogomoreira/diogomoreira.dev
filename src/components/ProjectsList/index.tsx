import React from "react";
import { ProjectItem } from "@/lib/content";
import { v4 as uuidv4 } from "uuid";
import ProjectItemDisplay from "../ProjectItemDisplay";

type ProjectsListProps = {
  items: ProjectItem[];
};

const ProjectsList: React.FC<ProjectsListProps> = ({ items }: ProjectsListProps) => {
  return (
    <>
      {items.map(item => (
        <ProjectItemDisplay key={uuidv4()} item={item} />
      ))}
    </>
  );
};

export default ProjectsList;
