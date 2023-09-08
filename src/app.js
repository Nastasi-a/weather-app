let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let newDay = days[now.getDay()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
let sec = now.getSeconds();
console.log(`Today is ${newDay}, ${hours}:${minutes}:${sec}`);
dateTime.innerHTML = `${newDay}, ${hours}:${minutes}`;

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCity(event) {
  event.preventDefault();
  let showCity = document.querySelector("#city-search").value;
  searchCity(showCity);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", displayCity);

function searchCity(city) {
  let apiKey = "6ae729a4da875ca4234e46786818bbb2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temp);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function temp(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector(".temperature");
  nowTemp.innerHTML = `${temperature}`;

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
let apiKey = "6ae729a4da875ca4234e46786818bbb2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(temp);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;

  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showPosition(position) {
  console.log(position);
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6ae729a4da875ca4234e46786818bbb2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(temp);
}

navigator.geolocation.getCurrentPosition(showPosition);
