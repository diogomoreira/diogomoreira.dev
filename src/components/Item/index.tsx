import { PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import Tag from "../Tag";
import * as DOMPurify from "dompurify";
import { LocalizedLink as Link } from "gatsby-theme-i18n";

const ItemContainer = styled.article`
  border: var(--border-default);
  border-radius: var(--border-radius);
  overflow: hidden;
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  margin: 1rem 0;
`;

const ItemImage = styled(GatsbyImage)`
  max-width: ${props => (props.cover ? "100%" : "30%")};
`;

const ItemContent = styled.div`
  flex: 1;
  padding: var(--padding);
  font-size: var(--font-size-h4);

  p {
    margin-bottom: 0.75rem;
  }
`;

const ItemHeader = styled.header`
  margin-bottom: 1rem;
  a {
    color: var(--link-color);
    text-decoration: none;
  }
`;

const ItemDate = styled.time`
  font-size: var(--font-size-h4);
  color: var(--secondary-text-color);
`;

const ItemTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

type ItemProps = {
  id: string;
  title: string;
  date?: string;
  link?: string;
  content: React.ReactNode;
  image?: IGatsbyImageData;
  tags?: string[];
};

const ListItem: React.FC<ItemProps> = (props: ItemProps) => {
  const { id, title, link, date, content, image, tags } = props;
  return (
    <ItemContainer key={id}>
      {image && <ItemImage objectFit="cover" image={image} alt={title} />}
      <ItemContent>
        <ItemHeader>
          <Link to={link}>
            <h2>{title}</h2>
          </Link>
          <ItemDate>{date}</ItemDate>
        </ItemHeader>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></p>
        <footer>
          <ItemTags>
            {tags?.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </ItemTags>
        </footer>
      </ItemContent>
    </ItemContainer>
  );
};

const CardItem: React.FC<ItemProps> = (props: ItemProps) => {
  const { id, title, date, content, image, tags } = props;
  return (
    <ItemContainer column key={id}>
      {image && <ItemImage cover image={image} alt={title} />}
      <ItemContent>
        <ItemHeader>
          <h2>{title}</h2>
          <ItemDate>{date}</ItemDate>
        </ItemHeader>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></p>
        <footer>
          <ItemTags>
            {tags?.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </ItemTags>
        </footer>
      </ItemContent>
    </ItemContainer>
  );
};

type PinItemProps = {
  hit: {
    objectID: string;
    title: string;
    type: string;
    publishDate?: string;
    link?: string;
    description: string;
    image?: IGatsbyImageData;
    tags?: string[];
  };
};

const PinItem: React.FC<PinItemProps> = (props: PinItemProps) => {
  const { hit } = props;

  return (
    <ItemContainer key={hit.objectID}>
      {hit.image && <ItemImage cover={true} image={hit.image} alt={hit.title} />}
      <ItemContent>
        <ItemHeader>
          <h2>{hit.title}</h2>
          <ItemDate>{hit.publishDate}</ItemDate>
        </ItemHeader>
        <p>{JSON.stringify(hit)}</p>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hit.description) }}></p>
        <footer>
          <ItemTags>
            {hit.tags?.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </ItemTags>
        </footer>
      </ItemContent>
    </ItemContainer>
  );
};

export { ListItem, CardItem, PinItem };
