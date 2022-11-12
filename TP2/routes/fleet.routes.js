import { Router } from "express";
import { getFleet, getAirplane, createAirplane, updateAirplane, deleteAirplane } from "../controllers/fleet.controller.js";

const router = Router();

router.get('/fleet', getFleet); 

router.get('/airplane/:plate', getAirplane);

router.post('/airplane', createAirplane);

router.put('/airplane/:plate', updateAirplane);

router.delete('/airplane/:plate', deleteAirplane);

export default router;

