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
function temp(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let nowTemp = document.querySelector(".temperature");
  nowTemp.innerHTML = `${temperature}`;
}

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
