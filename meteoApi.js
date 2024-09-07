const WEATHER_API_URL = "https://devmgramapi.meteo.pl/meteorograms";

const getWeather = async (latitude, longitude, { model = "um4_60" }) => {
  console.log(
    "getWeather",
    latitude,
    longitude,
    model,
    JSON.stringify({
      date: Math.floor(Date.now() / 1000),
      point: { lat: latitude.toString(), lon: longitude.toString() },
    })
  );
  const response = await fetch(`${WEATHER_API_URL}/${model}`, {
    method: "POST",
    body: JSON.stringify({
      date: Math.floor(Date.now() / 1000),
      point: { lat: latitude.toString(), lon: longitude.toString() },
    }),
  });

  return response.text();
};

module.exports = { getWeather };
