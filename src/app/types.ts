export type Content = {
  // default fields
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  // my fields
  title: string;
  description?: string;
  eyecatch?: string;
  content: string;
};

export type PostList = Pick<Content, 'id' | 'publishedAt' | 'title' | 'description' | 'eyecatch'>[];
