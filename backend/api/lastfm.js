const axios = require("axios");

require('dotenv').config()
const apiKey = process.env.LASTFM_API_KEY;

function toTitleCase(str) {
    str = str.toLowerCase();
    const words = str.split(" ");
    const capitalizedWords = words.map(word => {
        if (/[^a-zA-Z0-9]/.test(word.charAt(0))) {
            return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    return capitalizedWords.join(" ");
}

const getAlbums = async (query) => {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'album.search',
                album: query,
                api_key: apiKey,
                format: 'json',
                limit: 48
            }
        });
        albums = response.data.results.albummatches.album;
        processedAlbums = albums
                        .filter(album => album.image[3]['#text'] != "")
                        .map(album => ({
                            name: toTitleCase(album.name),
                            artist: toTitleCase(album.artist),
                            image: album.image[3]['#text']
                        }));
        return processedAlbums;

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        return "Error fetching data from Last.fm API";
    }
}

const getAlbumInfoById = async (id) => {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'album.getinfo',
                mbid: id,
                api_key: apiKey,
                format: 'json'
            }
        });

        if (response.data.album) {
            return response.data.album.tracks.track
        }
        return response.data

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        return "Error fetching data from Last.fm API";
    }
}

const getAlbumInfoByNameAndArtist = async (artist, album) => {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'album.getinfo',
                artist: artist,
                album: album,
                api_key: apiKey,
                format: 'json'
            }
        });

        return response.data.album.tracks.track

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        return "Error fetching data from Last.fm API";
    }
}

const getArtists = async (query) => {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'artist.search',
                artist: query,
                api_key: apiKey,
                format: 'json',
                limit: 4
            }
        });
        artists = response.data.results.artistmatches.artist;

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        return "Error fetching data from Last.fm API";
    }

    processedArtists = artists
                    .filter(artist => artist.listeners > 100000)
                    .map(artist => ({
                        name: toTitleCase(artist.name),
                        image: artist.image[3]['#text']
                    }));
    return processedArtists;
}

const getArtistTracksById = async (id) => {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'artist.gettoptracks',
                mbid: id,
                api_key: apiKey,
                format: 'json',
            }
        });

        if (response.data.toptracks) {
            return response.data.toptracks.track;
        }
        return response.data;

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        return "Error fetching data from Last.fm API";
    }
}

const getArtistTracksByName = async (artist) => {
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'artist.gettoptracks',
                artist: artist,
                api_key: apiKey,
                format: 'json',
            }
        });

        if (response.data.toptracks) {
            return response.data.toptracks.track;
        }
        return response.data;

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        return "Error fetching data from Last.fm API";
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