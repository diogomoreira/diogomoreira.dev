const striptags = require("striptags")

const blogIndexName = "BLOG_POSTS"
const linksIndexName = "LINKS"

const blogQuery = `{
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
          description
          date
          tags
        }
        image: frontmatter {
          cover {
            childImageSharp{
							gatsbyImageData
            }
          }
        }
        fields {
          slug
        }
        timeToRead
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const linkQuery = `{
  allLinksJson {
    nodes {
      id
      title
      type
      link
      description
      image {
        childImageSharp {
          gatsbyImageData(
            quality: 70
            webpOptions: { quality: 90 }
            pngOptions: { quality: 70 }
            jpgOptions: { quality: 90 }
          )
        }
      }
      publishDate
      tags
    }
  }
}`

function pageToAlgoliaRecord({
  node: { id, frontmatter, image, fields, ...rest },
}) {
  return {
    objectID: id,
    ...frontmatter,
    cover: image.cover,
    ...fields,
    ...rest,
  }
}

function linkToAlgoliaRecord({
  id,
  title,
  type,
  link,
  description,
  image,
  publishDate,
  tags,
}) {
  return {
    objectID: id,
    title: title,
    type: type,
    link: link,
    description: description,
    image: image,
    publishDate: publishDate,
    tags: tags,
  }
}

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(pageToAlgoliaRecord),
    indexName: blogIndexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: linkQuery,
    transformer: ({ data }) => data.allLinksJson.nodes.map(linkToAlgoliaRecord),
    indexName: linksIndexName,
  },
]

module.exports = queries
