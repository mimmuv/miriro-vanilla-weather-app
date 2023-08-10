///////////change city name after searching and display current temorature
function displayNewCity(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  getDailyForecast(response.data.coord);
  document.querySelector(
    "#weather-icon"
  ).innerHTML = `<img src=https://api.openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" 
alt=""
width="42"
/>`;
}

function displayTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function displayWeatherElements(response) {
  console.log(response);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
function changeCity(event) {
  event.preventDefault();
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayNewCity);
}

function changeCityTemperature() {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
}

function changeWeatherElements() {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  console.log(apiURL);
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayWeatherElements);
}

//get daily forecast coordinates from the daily openweather app
function getDailyForecast(coordinates) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayDailyForecast);
}

//display the weekly forecast
function displayDailyForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `

  <div class="col-2"> 

    <div class="forecast-date"> ${formatDay(forecastDay.dt * 1000)} </div>

<img src=http://api.openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" 
alt=""
width="42"
/>
      <div class="forecat-temps">
       <span class="min-weekly-temp">
${forecastDay.temp.min}º
  </span>
  <span class="max-weekly-temp">

${forecastDay.temp.max}º

  </span>
</div>
    </div>

`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

////////change date to current date
let now = new Date();
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let weekDay = weekDays[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let currentDate = document.querySelector("#date-today");
currentDate.innerHTML = `${weekDay}, ${currentHour}:${currentMinutes}`;

//when search button is clicked
let buttonclick = document.querySelector("#search-button");
buttonclick.addEventListener("click", changeCity);
buttonclick.addEventListener("click", changeCityTemperature);
buttonclick.addEventListener("click", changeWeatherElements);
//buttonclick.addEventListener("click"), displayForecast();
