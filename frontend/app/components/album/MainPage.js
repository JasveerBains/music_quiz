'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react"; 
import axios from "axios";

import TrackList from './TrackList';
import AlbumHeader from './AlbumHeader';
import { useAlbum } from '@/app/album/AlbumContext';

export default function MainPage() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

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
    if (id && id.trim() !== "") {
        fetchAlbumInfo();
    }
    }, [])

    if (loading) {
        return <div>loading...</div>
    }
    

    return (
        <div>
            <AlbumHeader albumInfo={albumInfo}/>
            <TrackList tracks={albumInfo.tracks}/>
        </div>
    )
}