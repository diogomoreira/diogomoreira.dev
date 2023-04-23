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

type LabItem = {
  title: string;
  timestamp: string;
  description: string;
  stack: string[];
  image: string;
  url: string;
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

export { type NoteItem, type LabItem, type LinkItem };
