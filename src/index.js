import * as app from "./app";
import * as UI from "./UI";
const searchForm = document.getElementById('search-form');
const changeUnitsBtn = document.getElementById('change-units-btn');
const searchField = document.getElementById('search-field');

window.onload = UI.fetchAndRender(app.getLocation());

searchForm.addEventListener('submit', function (e){
    e.preventDefault();
    UI.fetchAndRender(searchField.value);
})

changeUnitsBtn.onclick = function () {
    app.toggleUnits()
    const units = app.getUnits()

    if (units === 'metric') {
        changeUnitsBtn.textContent = 'Display °F'
    } else {
        changeUnitsBtn.textContent = 'Display °C'
    }

    UI.renderData()
    app.save();
}