"use strict";
const cloudy = document.querySelector(".cloud-number");
const humidity = document.querySelector(".humidity-number");
const windy = document.querySelector(".wind-number");
const rain = document.querySelector(".rain-number");
const userInput = document.querySelector(".user-input");
const searchBtn = document.querySelector(".search");
const displayedCity = document.querySelector(".displayed-city");
const displayedCondition = document.querySelector(".displayed-condition");
const displayedMainInfo = document.querySelector(".main-info-container");
const displayedDate = document.querySelector(".displayed-date");
const displayedTemp = document.querySelector(".displayed-temp");
const displayedConditionIcon = document.querySelector(
  ".displayed-condition-icon"
);
const fahrBtn = document.querySelector(".fahrenheit-button");
const celciusBtn = document.querySelector(".celcius-button");

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=d46d34a0468f4667b3d143437233003&q=${city}&aqi=no`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);

    // dom manipulation left side
    displayedTemp.textContent = weatherData.current.feelslike_c;
    displayedCity.textContent = weatherData.location.name;
    displayedDate.textContent = weatherData.location.localtime;
    displayedCondition.textContent = weatherData.current.condition.text;
    displayedConditionIcon.src = weatherData.current.condition.icon;
    //  dom manipulation right side
    cloudy.textContent = `${weatherData.current.cloud}%`;
    humidity.textContent = `${weatherData.current.humidity}%`;
    windy.textContent = `${weatherData.current.wind_kph}kph`;

    fahrBtn.addEventListener("click", switchToFahrenheit);
    celciusBtn.addEventListener("click", switchToCelcius);

    // switching temp
    function switchToFahrenheit() {
      displayedTemp.textContent = weatherData.current.feelslike_f;
      fahrBtn.classList.add("hidden");
      celciusBtn.classList.remove("hidden");
    }
    function switchToCelcius() {
      displayedTemp.textContent = weatherData.current.feelslike_c;
      celciusBtn.classList.add("hidden");
      fahrBtn.classList.remove("hidden");
    }
  } catch (error) {
    const errorMessage = `Enter a valid city name`;
    alert(errorMessage);
    console.error(error);
    userInput.value = "";
  }
}

searchBtn.addEventListener("click", function () {
  const userInputToLower = userInput.value.toLowerCase();
  const userInputFormated =
    userInputToLower.charAt(0).toUpperCase() + userInputToLower.slice(1);
  console.log(userInputFormated);
  getWeather(userInputFormated);
  userInput.value = "";

  fahrBtn.classList.remove("hidden");
  celciusBtn.classList.add("hidden");
  cloudy.classList.remove("hidden");
  humidity.classList.remove("hidden");
  windy.classList.remove("hidden");
  rain.classList.remove("hidden");
  displayedMainInfo.classList.remove("hidden");
});
