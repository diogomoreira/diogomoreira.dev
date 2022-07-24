import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { LocalizedLink as Link } from "gatsby-theme-i18n";

import kebabCase from "lodash.kebabcase";

import { Card, CardBody, CardDetails, CardFooter, CardImage, CardLinkHashTag, CardTitle } from "../Card";
import { StackItems } from "../../styles/global";

type;

const BlogPostCardItem = ({ objectID, description, title, cover, date, tags, slug, timeToRead }) => {
  return (
    <div key={objectID}>
      {/* <Link to={`/blog/${slug}`}> */}
      <CardImage image={cover.childImageSharp.gatsbyImageData} title={title} />
      {/* </Link> */}
      <div>
        <Link to={`/blog/${slug}`}>
          <h3>{title}</h3>
        </Link>
        <CardDetails timeToRead={timeToRead} date={date} />
        <article>{description}</article>
        <footer>
          <div>
            {tags &&
              tags.map((tag, i) => (
                <Link key={i} to={`/tags/${kebabCase(tag)}`}>
                  {tag}
                </Link>
              ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPostCardItem;
