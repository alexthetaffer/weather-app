const OPEN_WEATHER_API_KEY = 'de1ae8be874eb1bb11a00f17c0a6adf0';
async function getWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_API_KEY}`);
    const weatherData = await response.json();
    return weatherData;
}

console.log(getWeather('saint petersburg'))