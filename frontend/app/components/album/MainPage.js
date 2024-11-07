'use client';

import { useState, useEffect } from "react"; 
import { useParams } from 'next/navigation';
import axios from "axios";

import TrackList from '../shared/TrackList';
import AlbumHeader from '../shared/AlbumHeader';
import GameContainer from "./GameContainer";
import Spinner from "../shared/Spinner";

export default function MainPage() {

    const {id} = useParams();

    const [albumInfo, setAlbumInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAlbumInfo = () => {
        try {
            axios.get(`http://localhost:9000/api/album/info/${id}`)
              .then(res => {
                setAlbumInfo(res.data);
                localStorage.setItem('albumInfo', JSON.stringify(res.data));
                setLoading(false);
              });
        } catch (error)  {
            console.error("Failed to fetch album data:", error);
        }
    }
    
    useEffect(() => {
        const storedAlbumInfo = localStorage.getItem('albumInfo');
        if (!storedAlbumInfo || storedAlbumInfo.id != id) {
            fetchAlbumInfo();
        } else if (albumInfo.length === 0) {
            setAlbumInfo(JSON.parse(storedAlbumInfo));
            setLoading(false);
        }
    }, [])

    if (loading) {
        return (
            <Spinner />
        )
    }
    
    return (
        <div>
            <AlbumHeader albumInfo={albumInfo} clickableLink={true} />
            <GameContainer />
            <TrackList tracks={albumInfo.tracks} displayed={Array(albumInfo.tracks.length).fill(1)} />
        </div>
    )
}