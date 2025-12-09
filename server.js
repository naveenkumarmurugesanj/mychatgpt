const express = require('express');
const app = express();
require('dotenv').config();
const chatGPT = require('./server/chatgpt');
const login = require('./server/login');
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/chat', async (req, res) => {
    try {
        const gptResponse = await chatGPT.chatGPT(req, res);
        res.status(200).json(gptResponse);
        console.log("got Here");

    } catch (error) {
        res.status(500).json({ code: 500, status: "error", message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const gptResponse = await login.userLogin(req, res);
        res.status(200).json(gptResponse);
    } catch (error) {
        res.status(500).json({ code: 500, status: "error", message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});