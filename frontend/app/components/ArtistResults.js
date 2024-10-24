'use client';

import { useState, useEffect } from 'react';
import axios from "axios";
import './artist.css';

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


function ArtistResults({query}) {
  const [artists, setArtists] = useState([]);
  const defaultImage = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb777e7a-7d3c-487e-865a-fc83920564a1/d7kpm65-437b2b46-06cd-4a86-9041-cc8c3737c6f0.jpg/v1/fill/w_800,h_800,q_75,strp/no_Artist_art__no_cover___placeholder_picture_by_cmdrobot_d7kpm65-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvZWI3NzdlN2EtN2QzYy00ODdlLTg2NWEtZmM4MzkyMDU2NGExXC9kN2twbTY1LTQzN2IyYjQ2LTA2Y2QtNGE4Ni05MDQxLWNjOGMzNzM3YzZmMC5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.8yjX5CrFjxVH06LB59TpJLu6doZb0wz8fGQq4tM64mg";
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
      axios.get("http://localhost:9000/api/artist/" + query)
        .then(res => {
          setArtists(res.data);
        })
        .catch(error => console.log(error));
    }
    exampleFetch();

  }, [query])

  return (
    <div className="App">

        <div className='Collection'>
            {
            artists && artists.length > 0 ? (
                artists.map((a, i) => {
                    const randomIndex = a.name.length*17 % colours.length;
                    return (
                        <div key={i}>
                            <div className='Card' style={{backgroundColor: colours[randomIndex]}}>
                                <div className='Image'>
                                    <img src={a.image ? a.image : defaultImage} alt='Artist cover'></img>
                                </div>
        
                                <div className='Text'>
                                    <h3 >{a.name}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div>Could not find any artists.</div>
            )
            }
        </div>
    </div>
  );
}

export default ArtistResults;