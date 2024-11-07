'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from "axios";
import styles from './artist.module.css';
import Spinner from '../shared/Spinner';

export default function ArtistResults({query}) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const colours = ['rgba(200,200,0,0.5)', 
    'rgba(0,200,200,0.5)', 
    'rgba(200,0,200,0.5)',
    'rgba(0,0,200,0.5)',
    'rgba(200,0,0,0.5)', 
    'rgba(0,200,0,0.5)', 
    'rgba(100,100,0,0.5)', 
    'rgba(0,100,100,0.5)', 
    'rgba(100,0,100,0.5)', 
    'rgba(0,0,100,0.5)', 
    'rgba(100,0,0,0.5)', 
    'rgba(0,100,0,0.5)'];

    
  const fetchArtists = () => {
    axios.get(`http://localhost:9000/api/artist/${query}`)
      .then(res => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (query && query.trim() !== "") {
      fetchArtists();
    }
  }, [query])

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <div className={styles.artistCollection}>
        {
        artists && artists.length > 0 ? (
            artists.map((a, i) => {
                const randomIndex = a.name.length*17 % colours.length;
                return (
                  <Link href={`/artist/${encodeURIComponent(a.id)}`} key={i} className={styles.artistCard} style={{backgroundColor: colours[randomIndex]}}>
                      <div className={styles.artistImage}>
                          <img src={a.picture} alt='Artist cover'></img>
                      </div>

                      <div className={styles.artistText}>
                          <h3 >{a.name}</h3>
                      </div>
                  </Link>
                )
            })
        ) : (
            <div>Could not find any artists.</div>
        )
        }
    </div>
  );
}