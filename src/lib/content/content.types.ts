export type NoteItem = {
  body: string;
  category: string;
  cover?: string;
  description: string;
  slug: string;
  tags: string[];
  timestamp: string;
  title: string;
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
