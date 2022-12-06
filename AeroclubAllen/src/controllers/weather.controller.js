import { METAR_API_KEY } from '../config.js'
import { somethingWentWrong500 } from "../error/error.handler.js";

const weatherApi = "https://api.open-meteo.com/v1/forecast?windspeed_unit=kn&current_weather=true&hourly=relativehumidity_2m,precipitation,cloudcover,dewpoint_2m,temperature_2m,surface_pressure&timezone=America%2FSao_Paulo&latitude=-38.95833333&longitude=-67.80277778";
const metarApi = "https://api.checkwx.com/metar/SAZN?x-api-key=" + METAR_API_KEY;
const minutesBetween = 5;
let lastFetch = 0;
let weather = {
	wind_direction: "",
	wind_speed: "",
	surface_pressure: "",
	temperature: "",
	dewpoint: "",
	cloud_cover: "",
};
let metar;

// GetWeather uses an external weatherApi with coordinates
export const getWeather = async (req, res) => {
	try {
		// If more than minutesBetween passed from the last fetch, it fetches again
		if (lastFetch + minutesBetween * 60000 <= Date.now()) {
			let completeWeather = await (await fetch(weatherApi)).json();
			lastFetch = Date.now();

			weather.wind_direction = completeWeather.current_weather.winddirection;
			weather.wind_direction = completeWeather.current_weather.winddirection;
			weather.wind_speed = completeWeather.current_weather.windspeed;
			weather.surface_pressure = completeWeather.hourly.surface_pressure[0];
			weather.temperature = completeWeather.current_weather.temperature;
			weather.dewpoint = completeWeather.hourly.dewpoint_2m[0];
			weather.cloud_cover = completeWeather.hourly.cloudcover[0];
		}

		// Sends the weather json
		res.json(weather);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// GetMetar uses an external metar api of SAZN (nearest airport)
export const getMetar = async (req, res) => {
	try {
		// If more than minutesBetween passed from the last fetch, it fetches again
		if (lastFetch + minutesBetween * 60000 <= Date.now()) {
			metar = await (await fetch(metarApi)).json();
		}
        
        // Sends the metar json
		res.json(metar);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};
