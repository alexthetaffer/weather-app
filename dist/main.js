/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAndRender": () => (/* binding */ fetchAndRender),
/* harmony export */   "renderData": () => (/* binding */ renderData)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");


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
    formatTemp: function (value, units = _app__WEBPACK_IMPORTED_MODULE_0__.getUnits()) {
        if (units === 'metric') {
            return Math.round(value - 273.15) + '°C';
        }
        if (units === 'imperial') {
            return Math.round((value - 273.15) * 9 / 5 + 32) + '°F'
        }
    },
    formatWindSpeed: function (value, units = _app__WEBPACK_IMPORTED_MODULE_0__.getUnits()) {
        if (units === 'metric') {
            return Math.round(value) + 'm/s'
        }
        if (units === 'imperial') {
            return Math.round(value * 2.237) + 'mph'
        }
    }
}

async function fetchAndRender(location = _app__WEBPACK_IMPORTED_MODULE_0__.getLocation()) {
    const dataRaw = await _app__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData(location);
    _app__WEBPACK_IMPORTED_MODULE_0__.processWeatherData(dataRaw);
    renderData();
}


function renderData(data = _app__WEBPACK_IMPORTED_MODULE_0__.getWeatherData(), units = _app__WEBPACK_IMPORTED_MODULE_0__.getUnits()) {

    cityName.textContent = data.city_name;
    weatherDescription.textContent = data.weather_description;
    weatherIcon.textContent = ICON_MAP[data.icon];
    temperature.textContent = Units.formatTemp(data.temp);
    feelsLike.textContent = Units.formatTemp(data.feels_like);
    humidity.textContent = data.humidity + ' %';
    windSpeed.textContent = Units.formatWindSpeed(data.wind_speed);
}


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchWeatherData": () => (/* binding */ fetchWeatherData),
/* harmony export */   "getLocation": () => (/* binding */ getLocation),
/* harmony export */   "getUnits": () => (/* binding */ getUnits),
/* harmony export */   "getWeatherData": () => (/* binding */ getWeatherData),
/* harmony export */   "processWeatherData": () => (/* binding */ processWeatherData),
/* harmony export */   "save": () => (/* binding */ save),
/* harmony export */   "setLocation": () => (/* binding */ setLocation),
/* harmony export */   "toggleUnits": () => (/* binding */ toggleUnits)
/* harmony export */ });
const OPEN_WEATHER_API_KEY = 'de1ae8be874eb1bb11a00f17c0a6adf0';

const LOCAL_STORAGE_UNITS_KEY = 'weather.units';
const LOCAL_STORAGE_LOCATION_KEY = 'weather.location';

let units = localStorage.getItem(LOCAL_STORAGE_UNITS_KEY) || 'metric';
let location = localStorage.getItem(LOCAL_STORAGE_LOCATION_KEY) || 'saint petersburg';
let weatherData = null;

async function fetchWeatherData(location = getLocation()) {
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

function getWeatherData() {
    return weatherData;
}

function processWeatherData(data) {
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

function getUnits() {
    return units;
}

function toggleUnits() {
    units = (units === 'metric') ? 'imperial' : 'metric';
}

function getLocation () {
    return location;
}

function setLocation (newLocation) {
    location = newLocation;
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_UNITS_KEY, units);
    localStorage.setItem(LOCAL_STORAGE_LOCATION_KEY, location);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");


const searchForm = document.getElementById('search-form');
const changeUnitsBtn = document.getElementById('change-units-btn');
const searchField = document.getElementById('search-field');

window.onload = _UI__WEBPACK_IMPORTED_MODULE_1__.fetchAndRender(_app__WEBPACK_IMPORTED_MODULE_0__.getLocation());

searchForm.addEventListener('submit', function (e){
    e.preventDefault();
    _UI__WEBPACK_IMPORTED_MODULE_1__.fetchAndRender(searchField.value);
})

changeUnitsBtn.onclick = function () {
    _app__WEBPACK_IMPORTED_MODULE_0__.toggleUnits()
    const units = _app__WEBPACK_IMPORTED_MODULE_0__.getUnits()

    if (units === 'metric') {
        changeUnitsBtn.textContent = 'Display °F'
    } else {
        changeUnitsBtn.textContent = 'Display °C'
    }

    _UI__WEBPACK_IMPORTED_MODULE_1__.renderData()
    _app__WEBPACK_IMPORTED_MODULE_0__.save();
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map