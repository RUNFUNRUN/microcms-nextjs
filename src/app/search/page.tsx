'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Content } from '../types';
import Link from 'next/link';

export default function Home() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') as string | undefined;
  const [query, setQuery] = useState(q ?? '');
  const [displayQuery, setDisplayQuery] = useState<string | undefined>(q ?? undefined);
  const [posts, setPosts] = useState<Content[]>([]);

  useEffect(() => {
    if (q === undefined) {
      return;
    }
    handleSearch();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async () => {
    if (query === '') {
      setDisplayQuery(undefined);
      return;
    }
    const result = await fetch(`/api/search?q=${query}`);
    const data = await result.json();
    setDisplayQuery(query);
    setPosts(data);
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
      </div>
      <button onClick={handleSearch}>検索</button>
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
