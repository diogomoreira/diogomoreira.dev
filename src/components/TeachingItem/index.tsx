import { PageProps } from "gatsby";
import React from "react";
import styled from "styled-components";

const TeachingItemContainer = styled.article`
  border: var(--border-default);
  border-radius: var(--border-radius);
  display: flex;
  gap: 10px;
  margin: 1rem 0;
  overflow: hidden;
`;

const SemesterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--link-color);
  padding: 1rem;
`;

const Institution = styled.h3`
  color: var(--white);
`;

const Semester = styled.span`
  font-size: var(--font-size-h4);
  color: var(--gray-white);
`;

const SubjectList = styled.ul`
  padding: 1rem;
  list-style: none;
`;

export type TeachingItemProps = {
  institution: string;
  semester: string;
  subjects: Subject[];
};

export type Subject = { link: string; name: string };

const TeachingItem: React.FC<TeachingItemProps> = ({ institution, semester, subjects }: TeachingItemProps) => {
  return (
    <TeachingItemContainer>
      <SemesterContainer>
        <Institution>{institution}</Institution>
        <Semester>{semester}</Semester>
      </SemesterContainer>
      <SubjectList>
        {subjects.map((subject: Subject, i: number) => (
          <li key={i}>
            <a href={subject.link} target="_blank">
              {subject.name}
            </a>
          </li>
        ))}
      </SubjectList>
    </TeachingItemContainer>
  );
};

export default TeachingItem;
