'use client';

import AlbumResults from "./components/AlbumResults";
import SearchBar from "./components/SearchBar";
import { useState } from 'react';


export default function Home() {

  const [query, setQuery] = useState("");

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {
        query ? <AlbumResults query={query}/> : <div></div>
      }
    </div>
  );
}
