'use client';

import { useState, useEffect } from 'react';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



export default function SearchBar({onSubmit}) {

    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("album");


    useEffect(() => {
        onSubmit(searchInput, searchType);
    }, [searchInput, searchType]);

    return (
        <form className="searchContainer" >
            <div className="bar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
                <input type="text" placeholder="Search..." value={searchInput} onChange={(e) => {
                    setSearchInput(e.target.value);
                }}/>
            </div>
            <div className="options">
                <input type="radio" id="album" name="selection" value="album" checked={searchType=="album"} onChange={(e) => {
                    setSearchType(e.target.value);
                }}/>
                <label htmlFor="album">ALBUM</label>

                <hr></hr>

                <input type="radio" id="artist" name="selection" value="artist" checked={searchType=="artist"} onChange={(e) => {
                    setSearchType(e.target.value);
                }}/>
                <label htmlFor="artist">ARTIST</label>
            </div>
        </form>
    )
}