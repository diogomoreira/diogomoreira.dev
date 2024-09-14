import { Work } from "@/models/work.model";
import { generateUUID } from "@/utils/uuid";
import { format } from "date-fns";
import React from "react";
import { Tag, Tags } from "../Tag";

type WorkItemProps = {
  item: Work;
};

export default function WorkItem({ item }: Readonly<WorkItemProps>) {
  const startDate = format(new Date(item.startDate), "LL/yyyy");
  const endDate = item.endDate ? format(new Date(item.endDate), "LL/yyyy") : "Present";
  return (
    <div className="flex flex-col gap-2 py-6 first:pt-0">
      <h3 className="text-lg font-bold">
        {item.title} @ {item.company}
      </h3>
      <span className="text-sm font-semibold">
        {startDate} ~ {endDate}
      </span>
      <p className="text-sm leading-loose">{item.description}</p>
      <Tags>
        {item.stack.map(stackItem => (
          <Tag key={generateUUID()}>{stackItem}</Tag>
        ))}
      </Tags>
    </div>
  );
}
