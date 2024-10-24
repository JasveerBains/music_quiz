'use client';

import AlbumResults from "./components/AlbumResults";
import ArtistResults from "./components/ArtistResults";
import SearchBar from "./components/SearchBar";
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
        type=="album" ? (query ? <AlbumResults query={query}/> : <div></div>) : (query ? <ArtistResults query={query}/> : <div></div>)
      }
    </div>
  );
}
