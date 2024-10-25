const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

api = require('./api/lastfm.js');

dotenv.config();

const app = express();
const port = 9000;
const apiKey = process.env.LASTFM_API_KEY;

app.use(cors({
    origin: "*",
    methods: "GET"
}));

app.get('/api/album/:query', async (req, res) => {
    const query = encodeURIComponent(req.params.query);
    albums = await api.getAlbums(query);
    res.json(albums);
});

app.get('/api/album/info/:id', async (req, res) => {
    const id = req.params.id;
    albumInfo = await api.getAlbumInfoById(id);
    res.json(albumInfo);
});

app.get('/api/album/info/:artist/:album', async (req, res) => {
    const artist = encodeURIComponent(req.params.artist);
    const album = encodeURIComponent(req.params.album);
    albumInfo = await api.getAlbumInfoByNameAndArtist(artist, album);
    res.json(albumInfo);
});

app.get('/api/artist/:query', async (req, res) => {
    const query = encodeURIComponent(req.params.query);
    artists = await api.getArtists(query);
    res.json(artists);
});

app.get('/api/artist/tracks/id/:id', async (req, res) => {
    const id = encodeURIComponent(req.params.id);
    tracks = await api.getArtistTracksById(id);
    res.json(tracks);
});

app.get('/api/artist/tracks/:artist', async (req, res) => {
    const artist = encodeURIComponent(req.params.artist);
    tracks = await api.getArtistTrackByName(artist);
    res.json(tracks);
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});