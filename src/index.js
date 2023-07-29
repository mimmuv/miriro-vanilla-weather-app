///////////change city name after searching and display current temorature
function changeCity(event) {
  event.preventDefault();
  let newcity = document.querySelector("input");
  let h2 = document.querySelector("h2");
  if (newcity.value) {
    h2.innerHTML = newcity.value;
  } else {
    alert("Please enter a city to start searching");
  }
}
//display new temperature after searching for new city

function displayTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  //display temprature
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function changeCityTemperature() {
  let apiKey = "6782253072f7d90462731a624097fc54";
  let newcity = document.querySelector("#change-city").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayTemperature);
}
//when search button is clicked
let buttonclick = document.querySelector("#search-button");
buttonclick.addEventListener("click", changeCity);
buttonclick.addEventListener("click", changeCityTemperature);

//listen to current button click

let currentclick = document.querySelector("#current-city-button");
currentclick.addEventListener("click", getCurrentLocation);

//display current position weather

function displayCurrentPositionWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myCurrentPosition);
}

//find my current cordinates

function myCurrentPosition(position) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentPositionWeather);
}

////////change date to current date
let now = new Date();
let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let weekDay = weekDays[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let currentDate = document.querySelector("#date-today");
currentDate.innerHTML = `${weekDay}, ${currentHour}:${currentMinutes}`;
