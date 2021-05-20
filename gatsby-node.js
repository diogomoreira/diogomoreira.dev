const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` })
    createNodeField({
      node,
      name: `slug`,
      value: `blog${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post/index.js`)
  const tagPageTemplate = path.resolve(`src/templates/tag/index.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date
              description
              title
              tags
            }
            id
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
            id
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
            id
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.fields.slug,
      },
    })
  })

  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagPageTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
