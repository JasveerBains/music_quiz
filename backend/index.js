const express = require("express");
const cors = require("cors");

api = require('./api/deezer');

const app = express();
const port = 9000;

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

app.get('/api/artist/:query', async (req, res) => {
    const query = encodeURIComponent(req.params.query);
    artists = await api.getArtists(query);
    res.json(artists);
});

app.get('/api/artist/info/:id', async (req, res) => {
    const id = encodeURIComponent(req.params.id);
    artist = await api.getArtistInfoById(id);
    res.json(artist);
});

app.get('/api/artist/tracks/:id', async (req, res) => {
    const id = encodeURIComponent(req.params.id);
    tracks = await api.getArtistTracksById(id);
    res.json(tracks);
});

app.get('/api/artist/albums/:id/', async (req, res) => {
    const id = encodeURIComponent(req.params.id);
    albums = await api.getArtistAlbumsById(id);
    res.json(albums);
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});