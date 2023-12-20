const weatherElement = document.getElementById('weather');
const weatherDescriptionElement = document.getElementById('weather-description');

function capitalize(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function fetchWeather() {
  fetch('/weather?city=San Francisco') // Request to your server-side endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const mainWeather = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = Math.round(data.main.temp);

      weatherElement.innerText = `${mainWeather} ${temp}°C`;

      if (description.toLowerCase() !== mainWeather.toLowerCase()) {
        weatherDescriptionElement.innerText = capitalize(description);
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      weatherElement.innerText = 'Weather data unavailable';
    });
}

document.addEventListener('DOMContentLoaded', fetchWeather);
