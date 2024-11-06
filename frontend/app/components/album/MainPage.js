'use client';

import { useState, useEffect } from "react"; 
import { useParams } from 'next/navigation';
import axios from "axios";

import TrackList from './TrackList';
import AlbumHeader from '../shared/AlbumHeader';
import { useAlbum } from '@/app/album/AlbumContext';
import GameContainer from "./GameContainer";

export default function MainPage() {

    const {id} = useParams();
    console.log(id);

    const { albumInfo, setAlbumInfo } = useAlbum();
    const [loading, setLoading] = useState(true);

    const fetchAlbumInfo = () => {
        try {
            axios.get(`http://localhost:9000/api/album/info/${id}`)
              .then(res => {
                setAlbumInfo(res.data);
                setLoading(false);
              });
        } catch (error)  {
            console.error("Failed to fetch album data:", error);
        }
    }
    
    useEffect(() => {
        if (!albumInfo) {
            fetchAlbumInfo();
        } else if (albumInfo.id != id) {
            fetchAlbumInfo();
        } else {
            setLoading(false);
        }
    }, [])

    if (loading) {
        return <div>loading...</div>
    }
    

    return (
        <div>
            <AlbumHeader albumInfo={albumInfo} clickableLink={true}/>
            <GameContainer />
            <TrackList tracks={albumInfo.tracks}/>
        </div>
    )
}