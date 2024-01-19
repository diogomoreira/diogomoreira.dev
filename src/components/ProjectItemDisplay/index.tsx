import { ProjectItem } from "@/lib/content";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import { Card, CardBody, CardFooter, CardTitle } from "../Card";
import { BulletTag, Tags } from "../Tag";

type ProjectItemDisplayProps = {
  item: ProjectItem;
};

const ProjectItemDisplay: React.FC<ProjectItemDisplayProps> = ({ item }: ProjectItemDisplayProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <a href={item.url} title={item.title} target="_blank" rel="noopener noreferrer">
        <Image className="object-contain" alt={item.title} src={item.image} width={1920} height={1080} />
      </a>
      <CardBody>
        <CardTitle url={item.url} title={item.title} />
        <p className="card-text">{item.description}</p>
        <Tags>
          {item.stack.map(stackItem => (
            <BulletTag key={uuidv4()}>{stackItem}</BulletTag>
          ))}
        </Tags>
      </CardBody>
      <CardFooter>
        <time className="card-meta">
          {t("{{val, datetime}}", {
            val: new Date(item.timestamp),
            formatParams: {
              val: { year: "numeric", month: "long", day: "numeric" },
            },
          })}
        </time>
      </CardFooter>
    </Card>
  );
};

export default ProjectItemDisplay;
