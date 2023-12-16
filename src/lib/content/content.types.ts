export type PostItem = {
  id: string;
  body: string;
  title: string;
  description: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  published_at: string;
  edited_at: string;
  reading_time_minutes: number;
  tag_list: string[];
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
