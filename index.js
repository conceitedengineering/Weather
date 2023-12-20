const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to get weather
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'San Francisco';
  const apiKey = process.env.API_KEY;

  // Validate API Key
  if (!apiKey) {
    return res.status(500).send('API key not configured');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    // Check if the external API call was successful
    if (!response.ok) {
      throw new Error(`Error from OpenWeather API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data); // Use json() for consistency in response format
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).send('Error fetching weather data: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
