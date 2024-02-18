'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Content } from '../types';
import Link from 'next/link';

export default function Home() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') as string;
  const [query, setQuery] = useState(q ?? '');
  const [displayQuery, setDisplayQuery] = useState<string | undefined>(q ?? undefined);
  const [posts, setPosts] = useState<Content[]>([]);

  const search = async (query: string): Promise<Content[]> => {
    const result = await fetch(`/api/search?q=${query}`);
    if (result.status !== 200) {
      return [];
    }
    const data = await result.json();
    return data;
  };

  useEffect(() => {
    if (!q) {
      return;
    }
    search(query).then((posts) => {
      setPosts(posts);
    });
    return () => {
      setQuery('');
      setDisplayQuery(undefined);
      setPosts([]);
    };
    // eslint-disable-next-line
  }, []);

  const handleSearch = async () => {
    if (query.trim() === '') {
      setDisplayQuery(undefined);
      setPosts([]);
      return;
    }
    const posts = await search(query);
    setDisplayQuery(query);
    setPosts(posts);
  };

  return (
    <main>
      <div>
        <input
          name="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button onClick={handleSearch}>検索</button>
      </div>
      <div>
        {displayQuery && <p>{displayQuery}が含まれている記事</p>}
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
