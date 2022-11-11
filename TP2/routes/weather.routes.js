import { Router } from "express";
import { getWeather, getMetar } from "../controllers/weather.controller.js";

const router=Router();

router.get('/api/weather', getWeather);

router.get('/api/metar', getMetar);

export default router;