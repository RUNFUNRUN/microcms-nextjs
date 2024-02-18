'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleClick = () => {
    if (query === '') {
      router.push('/search');
    }
    router.push(`/search?q=${query}`);
  };

  return (
    <div>
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={handleClick}>検索</button>
    </div>
  );
};
