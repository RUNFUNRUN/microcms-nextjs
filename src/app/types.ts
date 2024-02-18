export type Content = {
  // default fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  // my fields
  title: string;
  description: string;
  content: string;
};

export type PostList = Pick<Content, 'id' | 'publishedAt' | 'title' | 'description'>[];

export type TocItem = {
  id: string;
  text: string;
  tagName: string;
  children: TocItem[];
};
