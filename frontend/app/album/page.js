'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react"; 
import axios from "axios";

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
            <div>{albumInfo.id}</div>
            <div>{albumInfo.title}</div>
            <div>{albumInfo.cover}</div>
            <div>{albumInfo.nb_tracks}</div>
            <div>{albumInfo.release_date}</div>
            <br/>
            <div>{albumInfo.artist.id}</div>
            <div>{albumInfo.artist.name}</div>
            <div>{albumInfo.artist.picture}</div>
            <br/>
            <div>
                {
                    albumInfo.tracks.map(track => {
                        return (
                            <div>
                                <div>{track.id}</div>
                                <div>{track.title}</div>
                                <div>{track.title_short}</div>
                                <div>{track.duration}</div>
                                <br/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}