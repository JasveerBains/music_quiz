'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from "react"; 
import axios from "axios";
import TrackList from '../shared/TrackList';
import AlbumList from './AlbumList';
import ArtistHeader from './ArtistHeader';
import Spinner from '../shared/Spinner';

export default function MainPage() {
    const {id} = useParams();

    const [artistInfo, setArtistInfo] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(true);

    const fetchArtistInfo = () => {
        try {
            axios.get(`http://localhost:9000/api/artist/info/${id}`)
              .then(res => {
                setArtistInfo(res.data);
                setLoadingInfo(false);
              });
        } catch (error)  {
            console.error("Failed to fetch artist data:", error);
        }
    }

    const [artistAlbums, setArtistAlbums] = useState(null);
    const [loadingAlbums, setLoadingAlbums] = useState(true);

    const fetchArtistAlbums = () => {
        try {
            axios.get(`http://localhost:9000/api/artist/albums/${id}`)
              .then(res => {
                setArtistAlbums(res.data);
                setLoadingAlbums(false);
              });
        } catch (error)  {
            console.error("Failed to fetch artist data:", error);
        }
    }

    const [artistTracks, setArtistTracks] = useState(null);
    const [loadingTracks, setLoadingTracks] = useState(true);

    const fetchArtistTracks = () => {
        try {
            axios.get(`http://localhost:9000/api/artist/tracks/${id}`)
              .then(res => {
                setArtistTracks(res.data);
                setLoadingTracks(false);
              });
        } catch (error)  {
            console.error("Failed to fetch artist data:", error);
        }
    }

    useEffect(() => {
        if (id && id.trim() !== "") {
            fetchArtistInfo();
            fetchArtistAlbums();
            fetchArtistTracks();
        }
    }, [])

    if (loadingInfo) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            <ArtistHeader artistInfo={artistInfo}/>

            {loadingAlbums ? (
                <Spinner />
            ) : (
                artistAlbums.length!=0 && <AlbumList albums={artistAlbums}/>
            )}

            {loadingTracks ? (
                <Spinner />
            ) : (
                <TrackList tracks={artistTracks} displayed={Array(artistTracks.length).fill(1)}/>
            )}

        </div>

    )
}