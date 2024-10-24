const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config()

const app = express();
const port = 9000;
const apiKey = process.env.LASTFM_API_KEY;

app.use(cors({
    origin: "*",
    methods: "GET"
}));

app.get('/api/album/:query', async (req, res) => {
    const query = encodeURIComponent(req.params.query);
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

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
    processedAlbums = albums
                    .filter(album => album.image[3]['#text'] != "")
                    .map(album => ({
                        name: album.name,
                        artist: album.artist,
                        image: album.image[3]['#text']
                    }));
    res.json(processedAlbums);
});

app.get('/api/album/info/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'album.getinfo',
                mbid: id,
                api_key: apiKey,
                format: 'json'
            }
        });
        res.json(response.data.album.tracks.track);

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/album/info/:artist/:album', async (req, res) => {
    const artist = encodeURIComponent(req.params.artist);
    const album = encodeURIComponent(req.params.album);
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
        res.json(response.data.album.tracks.track);

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/artist/:query', async (req, res) => {
    const query = encodeURIComponent(req.params.query);
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
        res.status(500).json({ error: 'Failed to fetch data' });
    }

    processedArtists = artists
                    .filter(artist => artist.listeners > 100000)
                    .map(artist => ({
                        name: artist.name,
                        image: artist.image[3]['#text']
                    }));
    res.json(processedArtists);
});

app.get('/api/artist/tracks/id/:id', async (req, res) => {
    const id = encodeURIComponent(req.params.id);
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'artist.gettoptracks',
                mbid: id,
                api_key: apiKey,
                format: 'json',
            }
        });
        res.json(response.data.toptracks.track);

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/artist/tracks/:artist', async (req, res) => {
    const artist = encodeURIComponent(req.params.artist);
    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'artist.gettoptracks',
                artist: artist,
                api_key: apiKey,
                format: 'json',
            }
        });
        res.json(response.data.toptracks.track);

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});