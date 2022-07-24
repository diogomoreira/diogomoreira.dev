import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { Card, CardBody, CardFooter, CardHashTag, CardImage, CardTitle } from "../Card";
import { StackItems } from "../../styles/global";
import { ProjectLink } from "./styled";

const ProjectCardItem = ({ project }) => {
  return (
    <div key={project.id}>
      <div className="card bg-light text-dark">
        <a href={project.url}>
          <CardImage image={project.image.childImageSharp.gatsbyImageData} title={project.title} />
        </a>
        <div>
          <h3>{project.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
          <StackItems>
            {project.stack.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </StackItems>
        </div>
        <footer>
          <a href={project.url}>
            <FontAwesomeIcon icon={faGithub} /> Link para o projeto
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ProjectCardItem;
