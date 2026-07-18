// 1. Dynamic Footer Dates
const currentYearElement = document.getElementById("currentyear");
const today = new Date();
currentYearElement.innerHTML = today.getFullYear();

const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;

// 2. Wind Chill Calculation
const tempSpan = document.getElementById("temperature");
const windSpan = document.getElementById("windspeed");
const windChillSpan = document.getElementById("windchill");

// Get the static values from the HTML
const temp = parseFloat(tempSpan.textContent);
const windSpeed = parseFloat(windSpan.textContent);

// One-line function to calculate Metric Wind Chill
const calculateWindChill = (t, v) => (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);

// Check conditions: Temp <= 10°C and Wind > 4.8 km/h
if (temp <= 10 && windSpeed > 4.8) {
    windChillSpan.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
} else {
    windChillSpan.textContent = "N/A";
}