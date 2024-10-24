'use client';

import AlbumResults from "./AlbumResults";
import ArtistResults from "./ArtistResults";
import SearchBar from "./SearchBar";
import { useState } from 'react';


export default function Home() {

  const [query, setQuery] = useState("");
  const [type, setType] = useState("album");

  const handleSearchSubmit = (searchQuery, searchType) => {
    setQuery(searchQuery);
    setType(searchType);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {
        type=="album" ? (query ? <AlbumResults query={query}/> : null) : (query ? <ArtistResults query={query}/> : null)
      }
    </div>
  );
}
