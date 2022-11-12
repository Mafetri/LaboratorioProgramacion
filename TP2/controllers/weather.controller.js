const weatherApi = "https://api.open-meteo.com/v1/forecast?windspeed_unit=kn&current_weather=true&hourly=relativehumidity_2m,precipitation,cloudcover,dewpoint_2m,temperature_2m,surface_pressure&timezone=America%2FSao_Paulo&latitude=-38.95833333&longitude=-67.80277778";
const metarApi = "https://api.checkwx.com/metar/SAZN?x-api-key=d1b8e067265a43a4859df77708";

// GetWeather uses an external weatherApi with coordinates
export const getWeather = async (req, res) => {
    const weatherFetch = await fetch(weatherApi);
    const weather = await weatherFetch.json();
    res.json({
        wind_direction: weather.current_weather.winddirection,
        wind_speed: weather.current_weather.windspeed,
        surface_pressure: weather.hourly.surface_pressure[0],
        temperature: weather.current_weather.temperature,
        dewpoint: weather.hourly.dewpoint_2m[0],
        cloud_cover: weather.hourly.cloudcover[0]
    })
}

// GetMetar uses an external metar api of SAZN (nearest airport)
export const getMetar = async (req, res) => {
    const metarFetch = await fetch(metarApi);
    const metar = await metarFetch.json();
    res.json(metar);
}
