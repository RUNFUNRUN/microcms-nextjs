'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';

export const SearchBox = () => {
  const [query, setQuery] = useState('');

  const handleClick = () => {
    if (query === '') {
      redirect('/search');
    }
    redirect(`/search?q=${query}`);
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
