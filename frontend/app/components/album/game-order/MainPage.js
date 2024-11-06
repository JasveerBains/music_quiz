'use client';

import React, { useState,useEffect } from 'react'
import Header from '../../shared/AlbumHeader'

import { useAlbum } from '@/app/album/AlbumContext';
import TrackList from './TrackList';
import GameInfo from './GameInfo';
import { shuffleArray } from '@/app/utils/arrayProcessing';

const MainPage = () => {

    const { albumInfo } = useAlbum();
    if (!albumInfo) {
        return <div>go back</div>
    }

    
    const [correct, setCorrect] = useState([]);
    const correctOrder = albumInfo.tracks;
    const [currOrder, setCurrOrder] = useState([]);

    const [checkable, setCheckable] = useState(true);
    const [attempts, setAttempts] = useState(0);

    const checkOrder = () => {
        setAttempts(attempts+1);
        var newCorrect = [];
        for (let i=0; i<currOrder.length; i++) {
            if (currOrder[i].title == correctOrder[i].title && currOrder[i].duration == correctOrder[i].duration) {
                newCorrect.push(i)
            }
        }
        if (JSON.stringify(newCorrect) == JSON.stringify(correct)) {
            var container = document.getElementById("gameInfoContainer");
            var container2 = document.getElementById("tracklistContainer");
            container.style.outline = "0.5rem solid red";
            container2.style.outline = "0.5rem solid red";
            setTimeout(() => {
                container.style.removeProperty("outline");
                container2.style.removeProperty("outline");
            }, 1500);

        } else {
            var container = document.getElementById("gameInfoContainer");
            var container2 = document.getElementById("tracklistContainer");
            container.style.outline = "0.5rem solid limegreen";
            container2.style.outline = "0.5rem solid limegreen";
            setTimeout(() => {
                container.style.removeProperty("outline");
                container2.style.removeProperty("outline");
            }, 500);
            setCorrect(newCorrect);
        }
    }

    const initialiseGameState = () => {
        setCurrOrder(shuffleArray(correctOrder));
        setCorrect([]);
        setAttempts(0);
    };

    useEffect(() => {
        initialiseGameState();
    }, [])

    return (
        <div>
            <Header albumInfo={albumInfo} clickableLink={false}/>
            <GameInfo currOrder={correctOrder} correct={correct} id={albumInfo.id} attempts={attempts} checkable={checkable} checkOrder={checkOrder} restartGame={initialiseGameState}/>
            <TrackList currOrder={currOrder} setCurrOrder={setCurrOrder} correct={correct} setCheckable={setCheckable}/>
        </div>
    )
}

export default MainPage