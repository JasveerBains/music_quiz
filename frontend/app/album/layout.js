import { AlbumProvider } from './AlbumContext';

export default function AlbumLayout({ children }) {
    return (
        <AlbumProvider>
            <div>{children}</div>
        </AlbumProvider>
    );
}