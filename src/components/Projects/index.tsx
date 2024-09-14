import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { Card, CardBody, CardFooter, CardParagraph, CardTitle } from "../Card";
import { BulletTag, Tags } from "../Tag";
import { Project } from "@/models/project.model";
import { generateUUID } from "@/utils/uuid";

type ProjectsListProps = {
  items: Project[];
};

const ProjectsList: React.FC<ProjectsListProps> = ({ items }: ProjectsListProps) => {
  return (
    <div className="masonry sm:masonry-sm md:masonry-md">
      {items.map(item => (
        <ProjectItem key={generateUUID()} item={item} />
      ))}
    </div>
  );
};

type ProjectItemDisplayProps = {
  item: Project;
};

const ProjectItem: React.FC<ProjectItemDisplayProps> = ({ item }: ProjectItemDisplayProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <a href={item.url} title={item.title} target="_blank" rel="noopener noreferrer">
        <Image className="object-contain" alt={item.title} src={item.image} width={1920} height={1080} />
      </a>
      <CardBody>
        <CardTitle url={item.url} title={item.title} />
        <CardParagraph>{item.description}</CardParagraph>
        <Tags>
          {item.stack.map(stackItem => (
            <BulletTag key={generateUUID()}>{stackItem}</BulletTag>
          ))}
        </Tags>
      </CardBody>
      <CardFooter>
        <time className="text-xs text-spring-wood-500 dark:text-gray-300">
          {t("{{val, datetime}}", {
            val: new Date(item.lastUpdate),
            formatParams: {
              val: { year: "numeric", month: "long", day: "numeric" },
            },
          })}
        </time>
      </CardFooter>
    </Card>
  );
};

export { ProjectsList, ProjectItem };
