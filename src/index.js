///////////change city name after searching and display current temorature
function displayNewCity(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
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
  //document.querySelector("#precipitation").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
function changeCity() {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayNewCity);
}

function changeCityTemperature() {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
}

function changeWeatherElements() {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayWeatherElements);
}

function displayForecast() {
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `

  <div class="col-2"> 

    <div class="forecast-date"> Mon </div>

<i class="fa-solid fa-cloud"></i>
      <div class="forecat-temps">
       <span class="min-weekly-temp">
6º
  </span>
  <span class="max-weekly-temp">

  27º

  </span>
</div>
    </div>

`;
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
displayForecast();
