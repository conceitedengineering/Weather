// Required modules
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to get weather
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'San Francisco';
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
