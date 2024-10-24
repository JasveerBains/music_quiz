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
  const defaultImage = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb777e7a-7d3c-487e-865a-fc83920564a1/d7kpm65-437b2b46-06cd-4a86-9041-cc8c3737c6f0.jpg/v1/fill/w_800,h_800,q_75,strp/no_album_art__no_cover___placeholder_picture_by_cmdrobot_d7kpm65-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZWI3NzdlN2EtN2QzYy00ODdlLTg2NWEtZmM4MzkyMDU2NGExXC9kN2twbTY1LTQzN2IyYjQ2LTA2Y2QtNGE4Ni05MDQxLWNjOGMzNzM3YzZmMC5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.8yjX5CrFjxVH06LB59TpJLu6doZb0wz8fGQq4tM64mg";

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
    <div className="App">

      <div className='albumCollection'>
        {
          albums.map((a, i) => {
            return (
                <div key={i} className='albumCard'>
                  <div className='albumImage'>
                    <img src={a.image[3]["#text"] ? a.image[3]["#text"] : defaultImage} alt='album cover'></img>
                  </div>

                  <div className='albumText'>
                    <h3 >{toTitleCase(a.name)}</h3>
                    <h4 >{a.artist}</h4>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default AlbumResults;