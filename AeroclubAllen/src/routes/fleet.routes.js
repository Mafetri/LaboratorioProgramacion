import { Router } from "express";
import { getFleet, getAirplane, createAirplane, updateAirplane, deleteAirplane } from "../controllers/fleet.controller.js";
import { uploadAirplane } from "../controllers/uploader.js";

const router = Router();

router.get('/fleet', getFleet); 

router.get('/airplane/:plate', getAirplane);

router.post('/airplane', uploadAirplane.single('file'), createAirplane);

router.patch('/airplane/:plate', uploadAirplane.single('file'), updateAirplane);

router.delete('/airplane/:plate', deleteAirplane);

export default router;

