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
    <div className="flex gap-2 m-2">
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="border-2 border-black pr-2"
      />
      <button onClick={handleClick} className="border-2 border-black bg-gray-200 px-2 py-1">
        検索
      </button>
    </div>
  );
};
