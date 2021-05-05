import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { Link } from "gatsby"

import "./author.scss"
import { PageSection } from "components/Layout"
import SocialLinks from "components/SocialLinks"

const Author = ({ image }) => {
  return (
    <PageSection className="py-3">
      <div
        id="author"
        className="d-flex flex-column flex-sm-column flex-md-row"
      >
        <div className="author-text lh-lg me-md-4 order-1 order-md-0">
          <h1 className="page-title">Diogo Moreira</h1>
          <p>
            Olá! Me chamo <strong>Diogo Moreira</strong>.{" "}
            <strong>Professor</strong> no{" "}
            <a href="https://ifpb.edu.br" target="_blank">
              Instituto Federal de Educação, Ciência e Tecnologia da Paraíba
            </a>{" "}
            desde 2014. Graduado em{" "}
            <strong>Análise e Desenvolvimento de Sistemas</strong> pelo IFPB
            (2012), Especialista em <strong>Engenharia de Software</strong> pela
            Estácio iDez (2015), Mestre em{" "}
            <strong>Engenharia de Software</strong> pelo CESAR School (2019).{" "}
          </p>
          <p>
            Amigo. Amante da música. Gamer nas horas vagas. Você pode me
            conhecer um pouco melhor pelo que escrevo no{" "}
            <Link to="/blog">blog</Link> ou pelo que eu recomendo de leituras,
            música, filmes e jogos pela seção de <Link to="/links">links</Link>{" "}
            aqui do meu site.
          </p>
          <p>
            Seja bem vindo ao meu site e a vontade para entrar em contato por
            qualquer rede social!
          </p>
          <SocialLinks />
        </div>
        <div className="author-profile-photo py-5 pt-0 d-flex order-0 order-md-1">
          <GatsbyImage
            imgClassName="img-thumbnail rounded"
            image={image.childImageSharp.gatsbyImageData}
            alt={`Diogo Moreira`}
          />
        </div>
      </div>
    </PageSection>
  )
}

export default Author
