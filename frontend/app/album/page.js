'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react"; 
import axios from "axios";

import Track from "../components/Track";
import TrackList from '../components/TrackList';
import AlbumHeader from '../components/AlbumHeader';

export default function AlbumInfoPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log(id);

    const [albumInfo, setAlbumInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAlbumInfo = () => {
        try {
            axios.get(`http://localhost:9000/api/album/info/${id}`)
              .then(res => {
                setAlbumInfo(res.data);
                console.log(res.data);
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
    }, [id])

    if (loading) {
        return <div>loading...</div>
    }
    

    return (
        <div>
            <AlbumHeader albumInfo={albumInfo}/>
            <br/>
            <TrackList tracks={albumInfo.tracks}/>
        </div>
    )
}