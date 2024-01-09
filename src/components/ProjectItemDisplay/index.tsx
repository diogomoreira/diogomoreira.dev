import { ProjectItem } from "@/lib/content";
import Image from "next/image";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "next-i18next";
import { Card, CardBody, CardFooter, CardImage, CardTitle } from "../Card";
import { BulletTag, Tag, Tags } from "../Tag";

type ProjectItemDisplayProps = {
  item: ProjectItem;
};

const ProjectItemDisplay: React.FC<ProjectItemDisplayProps> = ({ item }: ProjectItemDisplayProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardImage url={item.url} title={item.title}>
        <Image className="object-contain" alt={item.title} src={item.image} width={1920} height={1080} />
      </CardImage>
      <CardBody>
        <CardTitle url={item.url} title={item.title} />
        <p className="text-sm leading-relaxed">{item.description}</p>
        <Tags>
          {item.stack.map(stackItem => (
            <BulletTag key={uuidv4()}>{stackItem}</BulletTag>
          ))}
        </Tags>
      </CardBody>
      <CardFooter>
        <time>
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
