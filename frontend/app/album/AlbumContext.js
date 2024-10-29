'use client';

import { createContext, useContext, useState } from "react";

const AlbumContext = createContext();

export function AlbumProvider({ children }) {
    const [albumInfo, setAlbumInfo] = useState(null);

    return (
        <AlbumContext.Provider value={{ albumInfo, setAlbumInfo }}>
            {children}
        </AlbumContext.Provider>
    );
}

export const useAlbum = () => useContext(AlbumContext);