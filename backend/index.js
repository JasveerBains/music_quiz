const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config()

const app = express();
const port = 9000;

app.use(cors({
    origin: "*",
    methods: "GET"
}));

app.get('/api/album/:query', async (req, res) => {
    const query = req.params.query;
    const apiKey = process.env.LASTFM_API_KEY;

    try {
        const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
            params: {
                method: 'album.search',
                album: query,
                api_key: apiKey,
                format: 'json'
            }
        });
        res.json(response.data);

    } catch(error) {
        console.error('Error fetching data from Last.fm API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}) 

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})