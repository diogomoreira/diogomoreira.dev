import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  Card,
  CardBody,
  CardFooter,
  CardHashTag,
  CardImage,
  CardTitle,
} from "components/Card"
import { StackItems } from "styles/globalStyles"
import { ProjectLink } from "./styled"

const ProjectCardItem = ({ project }) => {
  return (
    <Card key={project.id}>
      <div className="card bg-light text-dark">
        <a href={project.url}>
          <CardImage
            image={project.image.childImageSharp.gatsbyImageData}
            title={project.title}
          />
        </a>
        <CardBody>
          <CardTitle>{project.title}</CardTitle>
          <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
          <StackItems>
            {project.stack.map((item, i) => (
              <CardHashTag key={i}>{item}</CardHashTag>
            ))}
          </StackItems>
        </CardBody>
        <CardFooter>
          <ProjectLink href={project.url}>
            <FontAwesomeIcon icon={faGithub} /> Link para o projeto
          </ProjectLink>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ProjectCardItem
