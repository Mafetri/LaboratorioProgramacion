import { Router } from "express";
import { getFleet, getAirplane, createAirplane, updateAirplane, deleteAirplane } from "../controllers/fleet.controller.js";

const router = Router();

router.get('/api/fleet', getFleet); 

router.get('/api/airplane/:plate', getAirplane);

router.post('/api/airplane', createAirplane);

router.put('/api/airplane/:plate', updateAirplane);

router.delete('/api/airplane/:plate', deleteAirplane);

export default router;

