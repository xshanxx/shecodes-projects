function formatDate(timestamp) {
  let date = new Date(timestamp);
  let listedDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  let today = date.getDate();
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
  let month = listedMonths[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  return `${listedDays[day]}, ${today} ${month} ${year}, ${hours}:${mins}`;
}

function displayWeather(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let apiKey = "b3e76648f469c0e9420b4566725bb244";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
