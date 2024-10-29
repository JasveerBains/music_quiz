'use client';

import MainPage from '../components/album/MainPage';
import { AlbumProvider } from './AlbumContext';

export default function AlbumHome() {

    return (
        <AlbumProvider>
            <MainPage />
        </AlbumProvider>
    )
}