import { Education } from "@/models/education.model";
import { format } from "date-fns";
import React from "react";

type EducationItemProps = {
  item: Education;
};

export default function EducationItem({ item }: Readonly<EducationItemProps>) {
  const startDate = format(new Date(item.startDate), "LL/yyyy");
  const endDate = item.endDate ? format(new Date(item.endDate), "LL/yyyy") : "Present";
  return (
    <div className="flex flex-col gap-2 py-6 first:pt-0">
      <h3 className="text-lg font-bold">
        {item.title} @ {item.institution}
      </h3>
      <span className="text-sm font-semibold">
        {startDate} ~ {endDate}
      </span>
      <p className="text-sm leading-loose">{item.description}</p>
    </div>
  );
}
