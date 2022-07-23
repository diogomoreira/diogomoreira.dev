import { graphql, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { LocalizedLink as Link } from "gatsby-theme-i18n";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import media from "styled-media-query";
import Content from "../../components/Content";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import Tag from "../../components/Tag";
import { useSiteMetadata } from "../../hooks/useMetadata";
import { StackItems } from "../../styles/utils";
import { Disqus } from "gatsby-plugin-disqus";

const Controls = styled.div`
  a {
    text-decoration: none;
  }
`;

const CoverImage = styled.div`
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 2rem auto;

  ${media.lessThan("medium")`
    max-width: 100%;
  `}
`;

const Metadata = styled.div`
  display: flex;
  gap: var(--gap);
  color: var(--secondary-text-color);
  font-size: calc(var(--font-size-h4) * 1.1);
  margin-top: 1rem;
`;

const Title = styled.h1`
  font-size: calc(var(--font-size-h1) * 2.5);
`;

const BlogPost = ({ data }: PageProps<Queries.PostBySlugQuery>) => {
  const post = data.mdx;
  console.log(post);

  const { t } = useTranslation();
  const frontmatter = post?.frontmatter;
  // console.log(frontmatter);

  const blogPath = `${useSiteMetadata().siteUrl}/blog/${frontmatter?.slug}`;
  const disqusConfig = {
    url: blogPath,
    identifier: post?.id,
    title: post?.frontmatter?.title,
  };

  return (
    <Layout>
      <SEO title={frontmatter?.title} />
      <Controls>
        <Link to="/blog">← {t("blog.control.back")}</Link>
      </Controls>
      <Title>{frontmatter?.title}</Title>
      <Metadata>
        <time>{frontmatter?.date}</time>
        <span>◆</span>
        <span>{post?.timeToRead} min read</span>
        <span>◆</span>
        <StackItems>
          {post?.frontmatter?.tags?.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </StackItems>
      </Metadata>
      <CoverImage>
        <GatsbyImage image={frontmatter?.cover?.childImageSharp?.gatsbyImageData} alt={frontmatter?.title} />
      </CoverImage>
      <Content>
        <MDXRenderer>{post?.body}</MDXRenderer>
      </Content>
      <footer>{frontmatter?.comments && <Disqus {...disqusConfig} />}</footer>
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($frontmatter__slug: String, $locale: String) {
    mdx(frontmatter: { slug: { eq: $frontmatter__slug } }, fields: { locale: { eq: $locale } }) {
      id
      frontmatter {
        title
        date(locale: $locale, formatString: "LL")
        cover {
          childImageSharp {
            gatsbyImageData(
              quality: 70
              webpOptions: { quality: 90 }
              pngOptions: { quality: 70 }
              jpgOptions: { quality: 90 }
            )
          }
        }
        tags
        description
        slug
        comments
      }
      body
      timeToRead
      tableOfContents
    }
    image: file(relativePath: { eq: "profile_photo_index.png" }) {
      childImageSharp {
        gatsbyImageData(width: 350, height: 350)
      }
    }
  }
`;

export default BlogPost;
