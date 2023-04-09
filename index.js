async function getWeather() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=d46d34a0468f4667b3d143437233003&q=London&aqi=no`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

getWeather();
