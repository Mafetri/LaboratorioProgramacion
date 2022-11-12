import { Router } from "express";
import { getWeather, getMetar } from "../controllers/weather.controller.js";

const router=Router();

router.get('/weather', getWeather);

router.get('/metar', getMetar);

export default router;