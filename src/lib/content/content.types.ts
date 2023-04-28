type NoteItem = {
  title: string;
  timestamp: string;
  category: string;
  tags: string[];
  slug: string;
  cover?: string;
  description: string;
  content: string;
};

type ProjectItem = {
  title: string;
  timestamp: string;
  description: string;
  stack: string[];
  image: string;
  url: string;
};

type PaperItem = {
  id: string;
  title: string;
  abstract: string;
  doi: string;
  year: string;
  url: string;
  author: string[];
};

type LinkItem = {
  title: string;
  type: string;
  link: string;
  description: string;
  image: string;
  timestamp: string;
  tags: string[];
};

export { type NoteItem, type ProjectItem, type LinkItem, type PaperItem };
