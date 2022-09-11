"use strict" // Make it strict and catch any subtle error


const API_endpoint = "https://api.openweathermap.org/data/2.5/weather";
const API_key = OpenWeatherMap API KEY;
// Get access to the HTML elements
const date = document.querySelector(".date");
const place = document.querySelector(".place");
const temperature = document.querySelector(".temperature");
const weatherCondition = document.querySelector(".weatherCondition");
const weatherIcon = document.querySelector("#weatherIcon");
// Object to help get an icon from ... well another icon)
const weatherIcons = {
  i01d: "wi-day-sunny",
  i02d: "wi-day-cloudy",
  i03d: "wi-cloud",
  i04d: "wi-cloudy",
  i09d: "wi-day-showers",
  i10d: "wi-day-rain",
  i11d: "wi-day-thunderstorm",
  i13d: "wi-day-snow",
  i50d: "wi-day-fog",
  i01n: "wi-night-clear",
  i02n: "wi-night-partly-cloudy",
  i03n: "wi-night-alt-cloudy",
  i04n: "wi-night-cloudy-high",
  i09n: "wi-showers",
  i10n: "wi-night-rain",
  i11n: "wi-night-thunderstorm",
  i13n: "wi-night-snow",
  i50n: "wi-night-fog"
};


// Makes an HTTP request to the OpenWeatherMap
function setData(latitude, longitude) {

  let request = `${API_endpoint}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", request);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 404) {
      alert("Place not found");
    }
    else {
      let data = JSON.parse(xhr.response);
      let current_temperature = `<span>${Math.round(data.main.temp)}&deg</span>`;
      let current_place = data.name + ", " + data.sys.country;

      place.innerHTML = current_place;
      temperature.innerHTML = current_temperature;
      weatherCondition.innerHTML = data.weather[0]["main"];
      // weatherCondition.innerHTML = data.weather[0]["description"];
      weatherIcon.className = weatherIcons['i' + data.weather[0]["icon"]];
      setCurrentDate();
    }
  };
};

// Just sets the current date in the next format: "1st Jan"
function setCurrentDate() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let current_date = new Date();
  let day = current_date.getDate();
  let month = months[current_date.getMonth()];

  switch (day) {
    case 1:
      day += "st";
      break;
    case 2:
      day += "nd";
      break;
    case 3:
      day += "rd";
      break;
    default:
      day += "th";
  }

  date.innerHTML = day + ' ' + month;
};


// Gets user's location and calls setData()
navigator.geolocation.getCurrentPosition(function(location, latitude) {
  setData(location.coords.latitude, location.coords.longitude);
});
