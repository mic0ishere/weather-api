const fs = require("fs");
const { getApiToken, getWeather: getWeatherImgw } = require("./imgwApi");
const { getWeather: getWeatherMeteo } = require("./meteoApi");

(async () => {
  const apiToken = await getApiToken();
  const weather = await getWeatherImgw(52.22977, 21.01178, {
    apiToken
  });

  console.log(weather);
  fs.writeFileSync("weather-imgw.json", JSON.stringify(weather, null, 2));
})();


(async () => {
  const weather = await getWeatherMeteo(52.22977, 21.01178, {});

  console.log(weather);
  fs.writeFileSync("weather-meteo.json", JSON.stringify(weather, null, 2));
})();