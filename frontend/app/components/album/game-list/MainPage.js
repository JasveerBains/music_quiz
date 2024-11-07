'use client';

import React, { useState,useEffect } from 'react'
import Header from '../../shared/AlbumHeader'

import TrackList from '../../shared/TrackList';
import GameInfo from './GameInfo';

const MainPage = () => {

    const [albumInfo, setAlbumInfo] = useState([]);
    const storedAlbumInfo = localStorage.getItem('albumInfo');
    if (!storedAlbumInfo) {
        return <div>go back</div>
    } else {
        if (albumInfo.length === 0) {
            setAlbumInfo(JSON.parse(storedAlbumInfo));
        } else {
            console.log(albumInfo);
        }
    }

    var trackNames = [];
    const initialiseTrackNames = () => {
        albumInfo.tracks.forEach((t) => {
            var name = t.title_short;
            var res = ""
            for (let i=0; i<name.length; i++) {
                if (name[i] == "/" || name[i] == "(") {
                    break
                }
                res += name[i];
            }
            res = res.replace(/\W/g, '').trim().toLowerCase();
            trackNames.push(res);
        });
    }
    initialiseTrackNames();
    
    const [solved, setSolved] = useState([]);
    const initialiseGameState = () => {

        var blank = []
        for (let i=0; i<albumInfo.tracks.length; i++) {
            blank.push(0);
        }
        setSolved(blank);
    };

    useEffect(() => {
        initialiseGameState();
    }, [])

    return (
        <div>
            <Header albumInfo={albumInfo} clickableLink={false}/>
            <GameInfo trackNames={trackNames} solved={solved} setSolved={setSolved} id={albumInfo.id}/>
            <TrackList tracks={albumInfo.tracks} displayed={solved}/>
        </div>
    )
}

export default MainPage