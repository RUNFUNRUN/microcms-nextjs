import { client } from '@/lib/microcms';
import Link from 'next/link';
import { PostList } from './types';

export default async function Home() {
  const posts: PostList = await client.getAllContents({
    endpoint: 'blog',
    queries: {
      fields: ['id', 'publishedAt', 'title', 'description', 'eyecatch'],
    },
  });
  console.log(posts);

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>
              <Link href={`/content/${post.id}`}>{post.title}</Link>
            </p>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
