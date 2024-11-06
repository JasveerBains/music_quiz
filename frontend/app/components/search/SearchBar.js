'use client';

import { useState, useEffect } from 'react';
import styles from './search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



export default function SearchBar({onSubmit}) {

    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("album");


    useEffect(() => {
        onSubmit(searchInput, searchType);
    }, [searchInput, searchType]);

    return (
        <form className={styles.searchContainer} >
            <div className={styles.bar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon}/>
                <input type="text" placeholder="Search..." spellCheck="false" autoComplete='false' value={searchInput} onChange={(e) => {
                    setSearchInput(e.target.value);
                }}/>
            </div>
            <div className={styles.options}>
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