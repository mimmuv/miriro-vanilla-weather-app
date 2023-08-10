function displayWeatherElements(response) {
  //console.log(response);

  let iconElement = document.querySelector("#weather-icon");
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city-name").innerHTML = response.data.name;

  getDailyForecast(response.data.coord);
}
function changeCity(city) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayWeatherElements);
}

//get daily forecast coordinates from the daily openweather app
function getDailyForecast(coordinates) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayDailyForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//display the weekly forecast
function displayDailyForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

  <div class="col-2"> 

    <div class="forecast-date"> ${formatDay(forecastDay.dt)} </div>

<img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
alt=""
width="30" 
/>
      <div class="forecat-temps">
       <span class="min-weekly-temp">
${Math.round(forecastDay.temp.min)}º
  </span>
  <span class="max-weekly-temp">

${Math.round(forecastDay.temp.max)}º

  </span>
</div>
    </div>

`;
    }
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

//Show Harare forecast by default
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#change-city");
  changeCity(cityInputElement.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

changeCity("Harare");
