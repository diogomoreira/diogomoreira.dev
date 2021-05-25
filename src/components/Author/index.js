import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import SocialLinks from "components/SocialLinks"
import {
  AuthorAvatar,
  AuthorContainer,
  AuthorProfileText,
  AuthorTitle,
} from "./styled"
import Content from "components/Content"
import { useSiteMetadata } from "hooks/useMetadata"

const Author = () => {
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "profile_photo.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 350, height: 350)
        }
      }
    }
  `)
  const metadata = useSiteMetadata()
  return (
    <AuthorContainer>
      <AuthorAvatar>
        <GatsbyImage
          image={image.childImageSharp.gatsbyImageData}
          alt={metadata.title}
        />
      </AuthorAvatar>
      <AuthorProfileText>
        <AuthorTitle>Diogo Moreira</AuthorTitle>
        <Content>
          <p>
            Olá! Me chamo <strong>Diogo Moreira</strong>.{" "}
            <strong>Professor</strong> no{" "}
            <a href="https://ifpb.edu.br" target="_blank" rel="nofollow">
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
        </Content>
        <SocialLinks />
      </AuthorProfileText>
    </AuthorContainer>
  )
}

export default Author
