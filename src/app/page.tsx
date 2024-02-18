import { client } from '@/lib/microcms';
import Link from 'next/link';
import { PostList } from './types';
import { SearchBox } from './_components/SearchBox';

export default async function Home() {
  const posts: PostList = await client.getAllContents({
    endpoint: 'blog',
    queries: {
      fields: ['id', 'title', 'description', 'publishedAt'],
    },
  });

  return (
    <main>
      <SearchBox />
      <div className="my-2">
        <h2 className="text-2xl font-bold">記事一覧</h2>
        <ul className="blog-list">
          {posts.map((post) => {
            const publishedAt = new Date(post.publishedAt);
            const publishedAtString = `${publishedAt.getFullYear()}年${publishedAt.getMonth() + 1}月${publishedAt.getDate()}日`;
            return (
              <li key={post.id}>
                <div className="w-full h-[1px] bg-black my-2" />
                <p>
                  <Link
                    className="text-2xl underline text-blue-600 hover:text-blue-300"
                    href={`/content/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </p>
                <p className="text-xl">{post.description}</p>
                <div className="flex gap-4">
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
