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
        const processedAlbums = albums.map(album => ({
            name: album.title,
            artist: album.artist.name,
            image: album.cover
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
        albumInfo = response.data;
        return albumInfo;

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
        album = response.data.data[0];
        processedAlbum = {
            name: album.title,
            artist: album.artist.name,
            image: album.cover
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
                .map(artist => ({
                    name: artist.name,
                    image: artist.picture
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
        return tracks;

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
        return tracks;
        
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