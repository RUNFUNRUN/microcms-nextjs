import { client } from '@/lib/microcms';
import Link from 'next/link';
import { PostList } from './types';
import { SearchBox } from './_components/SearchBox';

export default async function Home() {
  const posts: PostList = await client.getAllContents({
    endpoint: 'blog',
    queries: {
      fields: ['id', 'publishedAt', 'title', 'description'],
    },
  });

  return (
    <main>
      <h1>Blog</h1>
      <SearchBox />
      <div>
        <h2>記事一覧</h2>
        <ul>
          {posts.map((post) => {
            const publishedAt = new Date(post.publishedAt);
            const publishedAtString = `${publishedAt.getFullYear()}年${publishedAt.getMonth() + 1}月${publishedAt.getDate()}日`;
            return (
              <li key={post.id}>
                <p>
                  <Link href={`/content/${post.id}`}>{post.title}</Link>
                </p>
                <p>{post.description}</p>
                <div>
                  <p>投稿日</p>
                  <p>{publishedAtString}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
