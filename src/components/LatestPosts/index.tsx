import * as React from "react";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import BlogPostCardItem from "../BlogPostCardItem";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { threeColumnBreakPoints, twoColumnBreakPoints } from "../../utils/masonry/breakpoints";
import { LatestPostsContainer, LatestPostTitle } from "./styled";

const LatestPosts = ({ posts }) => {
  return (
    <LatestPostsContainer>
      <LatestPostTitle>Últimas postagens</LatestPostTitle>
      <ResponsiveMasonry columnsCountBreakPoints={twoColumnBreakPoints}>
        <Masonry gutter="1rem">
          {posts.map(postItem => {
            return (
              <BlogPostCardItem
                key={postItem.id}
                objectID={postItem.id}
                title={postItem.frontmatter.title}
                date={postItem.frontmatter.date}
                slug={postItem.frontmatter.slug}
                tags={postItem.frontmatter.tags}
                cover={postItem.frontmatter.cover}
                timeToRead={postItem.timeToRead}
                description={postItem.frontmatter.description}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </LatestPostsContainer>
  );
};

export default LatestPosts;
