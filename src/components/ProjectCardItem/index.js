import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const ProjectCardItem = ({ project }) => {
  return (
    <div key={project.id}>
      <div className="card bg-light text-dark">
        <a href={project.url}>
          <GatsbyImage
            image={project.image.childImageSharp.gatsbyImageData}
            alt={project.title}
            className="card-img-top"
          />
        </a>
        <div className="card-body bg-white">
          <a href={project.url} className="text-decoration-none text-dark">
            <h4 className="card-title">{project.title}</h4>
          </a>
          <hr />
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: project.description }}
          ></p>
          <div className="card-text">
            {project.stack.map(item => (
              <span class="badge bg-secondary me-2">{item}</span>
            ))}
          </div>
        </div>
        <div className="card-footer text-end">
          <a
            href={project.url}
            class="btn btn-sm bg-dark text-light rounded"
            role="button"
            aria-disabled="true"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardItem
