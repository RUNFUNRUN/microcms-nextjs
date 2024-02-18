import { client } from '@/lib/microcms';
import Link from 'next/link';
import { PostList } from './types';

export default async function Home() {
  const posts: PostList = await client.getAllContents({
    endpoint: 'blog',
    queries: {
      fields: ['id', 'title', 'description', 'publishedAt'],
    },
  });

  return (
    <main>
      <div className="w-[960px] mx-auto">
        <h2>記事一覧</h2>
        <ul className="blog-list">
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
