'use client';

import React, { useState,useEffect } from 'react'
import Header from './Header'

import { useAlbum } from '@/app/album/AlbumContext';
import TrackList from './TrackList';
import GameInfo from './GameInfo';

const MainPage = () => {

    const { albumInfo } = useAlbum();
    if (!albumInfo) {
        return <div>go back</div>
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

    useEffect((trackNames) => {
        initialiseGameState(trackNames);
    }, [])

    return (
        <div>
            <Header albumInfo={albumInfo}/>
            <GameInfo trackNames={trackNames} solved={solved} setSolved={setSolved} id={albumInfo.id}/>
            <TrackList tracks={albumInfo.tracks} solved={solved}/>
        </div>
    )
}

export default MainPage