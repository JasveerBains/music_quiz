const axios = require("axios");


const getAlbums = async (query) => {
    try {
        const response = await axios.get("https://api.deezer.com/search/album/", {
            params: {
                q: query,
                limit: 24
            }
        });
        const albums = response.data.data;
        const processedAlbums = albums.map(a => ({
            id: a.id,
            title: a.title,
            cover: a.cover ? a.cover : "https://muzyka.vercel.app/img/album.png",
            nb_track: a.nb_tracks,
            artist: {
                id: a.artist.id,
                name: a.artist.name,
                picture: a.artist.picture
            }
        }));

        return processedAlbums;

    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        return "Error fetching data from Deezer API";
    } 
}

const getAlbumInfoById = async (id) => {
    try {
        const response = await axios.get(`https://api.deezer.com/album/${id}`);
        console.log(response.data);
        a = response.data;
        processedAlbumInfo = {
            id: a.id,
            title: a.title,
            cover: a.cover ? a.cover : "https://muzyka.vercel.app/img/album.png",
            nb_tracks: a.nb_tracks,
            release_date: a.release_date,
            artist: {
                id: a.artist.id,
                name: a.artist.name,
                picture: a.artist.picture
            },
            tracks: a.tracks.data.map((t, idx) => ({
                id: t.id,
                rank: idx+1,
                title: t.title,
                title_short: t.title_short,
                duration: t.duration
            }))
        }

        return processedAlbumInfo;

    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        return "Error fetching data from Deezer API";
    }
}

const getAlbumInfoByNameAndArtist = async (artist, album) => {
    try {
        const response = await axios.get(`https://api.deezer.com/search/album/`, {
            params: {
                q: `${album} ${artist}`
            }
        });
        a = response.data.data[0];
        processedAlbum = {
            id: a.id,
            title: a.title,
            cover: a.cover ? a.cover : "https://muzyka.vercel.app/img/album.png",
            nb_tracks: a.nb_tracks,
            release_date: a.release_date,
            artist: {
                id: a.artist.id,
                name: a.artist.name,
                picture: a.artist.picture
            }
        };

        return processedAlbum;

    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        return "Error fetching data from Deezer API";
    } 
}

const getArtists = async (query) => {
    try {
        const response = await axios.get("https://api.deezer.com/search/artist/", {
            params: {
                q: query,
                limit: 24
            }
        });
        artists = response.data.data;
        processedArtists = artists
                .map(a => ({
                    id: a.id,
                    name: a.name,
                    picture: a.picture
                }));

        return processedArtists;

    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        return "Error fetching data from Deezer API";
    } 
}

const getArtistTracksById = async (id) => {
    try {
        const response = await axios.get(`https://api.deezer.com/artist/${id}/top/`, {
            params: {
                limit: 100
            }
        });
        tracks = response.data.data;
        processedTracks = tracks
            .filter(t => t.artist.id == id)
            .map(t => ({
                id: t.id,
                title: t.title,
                title_short: t.title_short,
                duration: t.duration,
                artist: {
                    id: t.artist.id,
                    name: t.artist.name,
                },
                album: {
                    id: t.album.id,
                    title: t.album.title,
                    cover: t.album.cover ? t.album.cover : "https://muzyka.vercel.app/img/album.png",
            }
        }));

        return processedTracks;

    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        return "Error fetching data from Deezer API";
    } 
}

const getArtistTracksByName = async (artist) => {
    try {
        const response = await axios.get(`https://api.deezer.com/search/track/`, {
            params: {
                q: artist,
                limit: 100
            }
        });
        tracks = response.data.data;
        processedTracks = tracks
            .filter(t => t.artist.name.toLowerCase() == artist.toLowerCase())
            .map(t => ({
                id: t.id,
                title: t.title,
                title_short: t.title_short,
                duration: t.duration,
                artist: {
                    id: t.artist.id,
                    name: t.artist.name,
                },
                album: {
                    id: t.album.id,
                    title: t.album.title,
                    cover: t.album.cover ? t.album.cover : "https://muzyka.vercel.app/img/album.png",
            }
        }));

        return processedTracks;
        
    } catch (error) {
        console.error('Error fetching data from Deezer API:', error);
        return "Error fetching data from Deezer API";
    } 
}


module.exports = {
    getAlbums,
    getAlbumInfoById,
    getAlbumInfoByNameAndArtist,
    getArtists,
    getArtistTracksById,
    getArtistTracksByName
};