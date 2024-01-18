export type PageItem = {
  icon: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
}

export type PostItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
  origin: string;
};

export type ProjectItem = {
  description: string;
  image: string;
  stack: string[];
  timestamp: string;
  title: string;
  url: string;
};

export type PaperItem = {
  abstract: string;
  author: string[];
  doi: string;
  id: string;
  title: string;
  url: string;
  year: string;
  media: string;
};

export type BookmarkItem = {
  description: string;
  image: string;
  link: string;
  tags: string[];
  timestamp: string;
  title: string;
  type: string;
};
