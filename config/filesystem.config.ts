const images = {
  path: `${__dirname}/content/images/`,
  name: "images",
};

const posts = {
  path: `${__dirname}/content/posts`,
  name: "posts",
};

const pages = {
  path: `${__dirname}/src/pages/`,
  name: "pages",
};

const collections = {
  path: `${__dirname}/content/collections/`,
  name: "collections",
};

const publications = {
  path: `${__dirname}/content/publications`,
  name: "publications",
};

const filesystemConfig = [
  {
    resolve: "gatsby-source-filesystem",
    options: images,
  },
  {
    resolve: "gatsby-source-filesystem",
    options: posts,
  },
  {
    resolve: "gatsby-source-filesystem",
    options: pages,
  },
  {
    resolve: "gatsby-source-filesystem",
    options: collections,
  },
  {
    resolve: "gatsby-source-filesystem",
    options: publications,
  },
];

export default filesystemConfig;
