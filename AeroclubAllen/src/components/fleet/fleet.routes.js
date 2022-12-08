import { Router } from "express";
import { getFleet, getAirplane, createAirplane, updateAirplane, deleteAirplane } from "./fleet.controller.js";
import { uploadAirplane } from "../../multer/uploader.js";
import { isLoggedIn } from "../../lib/auth.js";

const router = Router();

router.get('/fleet', getFleet); 

router.get('/airplane/:plate', getAirplane);

router.post('/airplane', isLoggedIn, uploadAirplane.single('file'), createAirplane);

router.patch('/airplane/:plate', isLoggedIn, uploadAirplane.single('file'), updateAirplane);

router.delete('/airplane/:plate', isLoggedIn, deleteAirplane);

export default router;

