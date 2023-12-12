// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = process.env.WEATHER_API_KEY;
const city = 'San Francisco'; // Replace with the city you want the weather for
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


const weatherElement = document.getElementById('weather');
const weatherDescriptionElement = document.getElementById('weather-description');

function capitalize(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Example: Accessing an environment variable in Node.js
console.log("Environment Variable Value:", process.env.WEATHER_API_KEY);
 
function fetchWeather() {
  fetch(url)
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

      // Display the description if it does not directly match the 'main' weather
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
