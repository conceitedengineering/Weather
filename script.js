document.addEventListener('DOMContentLoaded', fetchWeather);

function fetchWeather() {
  // Use a relative path if your frontend is hosted on the same domain as your serverless function
  fetch('https://weather-seven-steel.vercel.app/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation: ', error);
      document.getElementById('weather').innerText = 'Weather data unavailable';
    });
}

function displayWeather(data) {
  // Assuming your serverless function returns the weather data in the desired format
  const mainWeather = data.mainWeather;
  const description = data.description;
  const temp = Math.round(data.temp);

  const weatherElement = document.getElementById('weather');
  const weatherDescriptionElement = document.getElementById('weather-description');

  weatherElement.innerText = `${mainWeather} ${temp}°C`;

  // Display the description if it does not directly match the 'main' weather
  if (description.toLowerCase() !== mainWeather.toLowerCase()) {
    weatherDescriptionElement.innerText = description;
  }
}

function capitalize(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
