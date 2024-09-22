// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

// Load the webhook URL from environment variables
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

app.post('/api/contact', async (req, res) => {
  try {
    const webhookBody = req.body;
    const response = await axios.post(webhookUrl, webhookBody);
    res.status(200).send('Message sent to Discord webhook.');
  } catch (error) {
    console.error('Error sending to Discord webhook:', error);
    res.status(500).send('Error sending message.');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
