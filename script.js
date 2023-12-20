const weatherElement = document.getElementById('weather');
const weatherDescriptionElement = document.getElementById('weather-description');

function capitalize(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function fetchWeather() {
  const url = '/weather?city=San Francisco'; // Endpoint URL

  fetch(url)
    .then(response => {
      if (!response.ok) {
        // Better error message with status code
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.weather || !data.main) {
        // Handle cases where data might be incomplete
        throw new Error('Incomplete weather data received');
      }

      const mainWeather = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = Math.round(data.main.temp);

      weatherElement.innerText = `${mainWeather} ${temp}°C`;

      if (description.toLowerCase() !== mainWeather.toLowerCase()) {
        weatherDescriptionElement.innerText = capitalize(description);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      weatherElement.innerText = 'Weather data unavailable';

      // Optionally, display a more user-friendly error message
      weatherDescriptionElement.innerText = 'Unable to retrieve weather data. Please try again later.';
    });
}

document.addEventListener('DOMContentLoaded', fetchWeather);
