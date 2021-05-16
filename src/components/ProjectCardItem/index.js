import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { Card, CardBody, CardFooter, CardImage } from "components/Card"
import { CardLinkHashTag } from "components/Card/styled"
import { StackItems } from "styles/globalStyles"
import { ProjectLink } from "./styled"

const ProjectCardItem = ({ project }) => {
  return (
    <Card key={project.id}>
      <div className="card bg-light text-dark">
        <CardImage
          image={project.image.childImageSharp.gatsbyImageData}
          title={project.title}
        />
        <CardBody title={project.title}>
          <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
          <StackItems>
            {project.stack.map(item => (
              <CardLinkHashTag>{item}</CardLinkHashTag>
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
