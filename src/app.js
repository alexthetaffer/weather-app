const OPEN_WEATHER_API_KEY = 'de1ae8be874eb1bb11a00f17c0a6adf0';

const LOCAL_STORAGE_UNITS_KEY = 'weather.units';
const LOCAL_STORAGE_LOCATION_KEY = 'weather.location';

let units = localStorage.getItem(LOCAL_STORAGE_UNITS_KEY) || 'metric';
let location = localStorage.getItem(LOCAL_STORAGE_LOCATION_KEY) || 'saint petersburg';
let weatherData = null;

export async function fetchWeatherData(location = getLocation()) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_API_KEY}`, {mode: 'cors'});
        if(!response.ok) {
            alert(`Location "${location}" not found`);
            return;
        }
        const weatherData = await response.json();
        setLocation(location);
        save();
        return weatherData;
    } catch (err) {
        alert(err)
    }
}

export function getWeatherData() {
    return weatherData;
}

export function processWeatherData(data) {
    weatherData = {
        city_name: data.name,
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        temp: Math.round(data.main.temp),
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        weather_description: data.weather[0].description,
        weather_title: data.weather[0].main,
        icon: data.weather[0].icon,
        wind_speed: data.wind.speed
    }
}

export function getUnits() {
    return units;
}

export function toggleUnits() {
    units = (units === 'metric') ? 'imperial' : 'metric';
}

export function getLocation () {
    return location;
}

export function setLocation (newLocation) {
    location = newLocation;
}

export function save() {
    localStorage.setItem(LOCAL_STORAGE_UNITS_KEY, units);
    localStorage.setItem(LOCAL_STORAGE_LOCATION_KEY, location);
}

