const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

app.post('/convert', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.json({ success: false, message: 'URL eksik' });
    }

    try {
        const response = await axios.post('https://youtube-mp3-converter.p.rapidapi.com/dl', {
            url: url,
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'youtube-mp3-converter.p.rapidapi.com'
            }
        });

        if (response.data.success) {
            res.json({ success: true, file: response.data.file });
        } else {
            res.json({ success: false, message: 'Dönüştürme başarısız' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
