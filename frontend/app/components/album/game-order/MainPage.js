'use client';

import React, { useState,useEffect } from 'react'
import Header from './Header'

import { useAlbum } from '@/app/album/AlbumContext';
import TrackList from './TrackList';
import GameInfo from './GameInfo';

const shuffleArray = (array) => {
    var arrayCopy = [...array]
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
        arrayCopy[randomIndex], arrayCopy[currentIndex]];
    }
    return arrayCopy
};

const MainPage = () => {

    const { albumInfo } = useAlbum();
    if (!albumInfo) {
        return <div>go back</div>
    }

    
    const [correct, setCorrect] = useState([]);
    const correctOrder = albumInfo.tracks;
    const [currOrder, setCurrOrder] = useState([]);

    const initialiseGameState = () => {
        setCurrOrder(shuffleArray(correctOrder));
    };

    useEffect(() => {
        initialiseGameState();
    }, [])

    return (
        <div>
            <Header albumInfo={albumInfo}/>
            <GameInfo currOrder={correctOrder} correct={correct} setCorrect={setCorrect} id={albumInfo.id}/>
            <TrackList currOrder={currOrder} setCurrOrder={setCurrOrder} correct={correct}/>
        </div>
    )
}

export default MainPage