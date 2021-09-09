function formatDate(date) {
  let currentDate = now.getDate();
  let listedMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = listedMonths[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let listedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = now.getDay();

  return `${listedDays[day]}, ${currentDate} ${month} ${year}, ${hours}:${mins}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather["0"].main;
}

function search(city) {
  let apiKey = "b3e76648f469c0e9420b4566725bb244";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let displayDate = document.querySelector("#date");
let now = new Date();
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);
displayDate.innerHTML = formatDate(now);

function findLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b3e76648f469c0e9420b4566725bb244";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function convertF(event) {
  event.preventDefault();
  let displayTemp = document.querySelector("#temp");
  displayTemp.innerHTML = 79;
}

function convertC(event) {
  event.preventDefault();
  let displayTemp = document.querySelector("#temp");
  displayTemp.innerHTML = 26;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertF);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertC);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("Click", getLocation);

search("New York");
