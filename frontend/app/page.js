'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SearchPage from "./components/SearchPage";
import AlbumInfoPage from "./components/AlbumInfoPage";
import ArtistInfoPage from "./components/ArtistInfoPage";


export default function Home() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/album/*" element={<AlbumInfoPage />} />
          <Route path="/artist/*" element={<ArtistInfoPage />} />
        </Routes>
      </div>
    </Router>
  );
}
