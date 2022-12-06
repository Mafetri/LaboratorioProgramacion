import { Router } from "express";
import { getFleet, getAirplane, createAirplane, updateAirplane, deleteAirplane } from "./fleet.controller.js";
import { uploadAirplane } from "../../multer/uploader.js";

const router = Router();

router.get('/fleet', getFleet); 

router.get('/airplane/:plate', getAirplane);

router.post('/airplane', uploadAirplane.single('file'), createAirplane);

router.patch('/airplane/:plate', uploadAirplane.single('file'), updateAirplane);

router.delete('/airplane/:plate', deleteAirplane);

export default router;

