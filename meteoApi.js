const WEATHER_API_URL = "https://devmgramapi.meteo.pl/meteorograms";

const getWeather = async (latitude, longitude, { model = "um4_60" }) => {
  const availableModels = await getAvailableModels();
  if (!availableModels[model.toLowerCase()]) {
    throw new Error(`Model ${model} is not available`);
  }

  const dates = availableModels[model.toLowerCase()];
  const response = await fetch(`${WEATHER_API_URL}/${model}`, {
    body: JSON.stringify({
      date: dates[dates.length - 1],
      point: { lat: latitude.toString(), lon: longitude.toString() },
    }),
    method: "POST",
  });

  const weather = await response.text();
  try {
    return JSON.parse(weather);
  } catch (error) {
    throw new Error("Could not parse weather data: " + response.statusText);
  }
};

const getAvailableModels = async () => {
  return await fetch(`${WEATHER_API_URL}/available`, {
    method: "POST",
  }).then((response) => response.json());
};

module.exports = { getWeather, getAvailableModels };
