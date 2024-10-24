'use client';

import { useState, useEffect } from 'react';
import axios from "axios";
import './album.css';

function toTitleCase(str) {
  str = str.toLowerCase();
  const words = str.split(" ");
  const capitalizedWords = words.map(word => {
    if (/[^a-zA-Z0-9]/.test(word.charAt(0))) {
      return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return capitalizedWords.join(" ");
}


function AlbumResults({query}) {
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

  useEffect(() => {
    const exampleFetch = () => {
      axios.get("http://localhost:9000/api/album/" + query)
        .then(res => {
          setAlbums(res.data);
        })
        .catch(error => console.log(error));
    }
    exampleFetch();

  }, [query])

  return (

      <div className='albumCollection'>
        {
          albums && albums.length > 0 ? (
            albums.map((a, i) => {
              const randomIndex = a.name.length*17 % colours.length;
              return (
                <div key={i} className='albumCard' style={{backgroundColor: colours[randomIndex]}}>
                  <div className='albumImage'>
                    <img src={a.image}></img>
                  </div>

                  <div className='albumText'>
                    <h3 >{toTitleCase(a.name)}</h3>
                    <h4 >{a.artist}</h4>
                  </div>
                </div>
              )
            })
          ) : (
            <div>Could not find any albums.</div>
          )
        }
      </div>
  );
}

export default AlbumResults;