'use client';

import { useState, useEffect } from 'react';
import './search.css';
import 'font-awesome/css/font-awesome.min.css';

function SearchBar({onSubmit}) {

    const [searchInput, setSearchInput] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form reload
        onSubmit(searchInput); // Call the onSubmit function passed from the parent
        setSearchInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="searchContainer" >
            <div className="bar">
                <i className="fa fa-search"></i>
                <input type="text" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            </div>
            <div className="options">
                <input type="radio" id="album" name="selection" value="album" defaultChecked/>
                <label htmlFor="album">ALBUM</label>

                <hr></hr>

                <input type="radio" id="artist" name="selection" value="artist"/>
                <label htmlFor="artist">ARTIST</label>
            </div>
        </form>
    )
}

export default SearchBar;