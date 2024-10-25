'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from "axios";
import './album.css';

export default function AlbumResults({query}) {

  const [albums, setAlbums] = useState([]);
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


  const fetchAlbums = () => {
    axios.get(`http://localhost:9000/api/album/${query}`)
      .then(res => {
        setAlbums(res.data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (query && query.trim() !== "") {
      fetchAlbums();
    }
  }, [query])

  return (
      <div className='albumCollection'>
        {
          albums && albums.length > 0 ? (
            albums.map((a, i) => {
              const randomIndex = (a.title.length + a.artist.name.length)*17 % colours.length;
              return (
                <Link href={`/album?name=${encodeURIComponent(a.title)}&artist=${encodeURIComponent(a.artist.name)}`} key={i} className='albumCard' style={{backgroundColor: colours[randomIndex]}}>
                  <div className='albumImage'>
                    <img src={a.cover}></img>
                  </div>

                  <div className='albumText'>
                    <h3 >{a.title}</h3>
                    <h4 >{a.artist.name}</h4>
                  </div>
                </Link>
              )
            })
          ) : (
            <div>Could not find any albums.</div>
          )
        }
      </div>
  );
}
