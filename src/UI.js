import * as app from './app'

const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const ICON_MAP = {
    '01d': 'sunny',
    '01n': 'clear_night',
    '02d': 'partly_cloudy_day',
    '02n': 'partly_cloudy_night',
    '03d': 'cloudy',
    '03n': 'cloudy',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'rainy',
    '09n': 'rainy',
    '10d': 'rainy',
    '10n': 'rainy',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'weather_snowy',
    '13n': 'weather_snowy',
    '50d': 'foggy'
}


const Units = {
    formatTemp: function (value, units = app.getUnits()) {
        if (units === 'metric') {
            return Math.round(value - 273.15) + '°C';
        }
        if (units === 'imperial') {
            return Math.round((value - 273.15) * 9 / 5 + 32) + '°F'
        }
    },
    formatWindSpeed: function (value, units = app.getUnits()) {
        if (units === 'metric') {
            return Math.round(value) + 'm/s'
        }
        if (units === 'imperial') {
            return Math.round(value * 2.237) + 'mph'
        }
    }
}

export async function fetchAndRender(location = app.getLocation()) {
    const dataRaw = await app.fetchWeatherData(location);
    app.processWeatherData(dataRaw);
    renderData();
}


export function renderData(data = app.getWeatherData(), units = app.getUnits()) {

    cityName.textContent = data.city_name;
    weatherDescription.textContent = data.weather_description;
    weatherIcon.textContent = ICON_MAP[data.icon];
    temperature.textContent = Units.formatTemp(data.temp);
    feelsLike.textContent = Units.formatTemp(data.feels_like);
    humidity.textContent = data.humidity + ' %';
    windSpeed.textContent = Units.formatWindSpeed(data.wind_speed);
}
