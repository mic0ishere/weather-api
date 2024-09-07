const METEO_HOMEPAGE = "https://meteo.imgw.pl/";
const WEATHER_API_URL = "https://meteo.imgw.pl/api/v1/forecast/fcapi";

const getApiToken = async () => {
  const indexPage = await fetch(METEO_HOMEPAGE).then((response) =>
    response.text()
  );
  const mainScriptName = indexPage.match(/src="main\.\w+\.js"/)[0];
  if (!mainScriptName) {
    throw new Error("Could not find main script URL");
  }

  const mainScriptUrl =
    METEO_HOMEPAGE + mainScriptName.match(/main\.\w+\.js/)[0];
  const mainScriptContent = await fetch(mainScriptUrl).then((response) =>
    response.text()
  );

  const apiToken = mainScriptContent
    .match(/apiToken:"\w+"/)?.[0]
    ?.split(":")?.[1]
    ?.slice(1, -1);
  if (!apiToken) {
    throw new Error("Could not find API token");
  }

  return apiToken;
};

const getWeather = async (latitude, longitude, {
  model = "hybrid",
  apiToken
}) => {
  if (!apiToken) apiToken = await getApiToken();

  const response = await fetch(
    `${WEATHER_API_URL}?token=${apiToken}&lat=${latitude}&lon=${longitude}&model=${model}`
  );

  return response.json();
};

module.exports = { getApiToken, getWeather };
