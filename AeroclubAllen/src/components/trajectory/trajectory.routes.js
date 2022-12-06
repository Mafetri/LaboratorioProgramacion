import { Router } from "express";
import { getTrajectory, createTrajectory, updateTrajectory, deleteTrajectory } from "./trajectory.controller.js";

const router = Router();

router.get('/trajectory', getTrajectory); 

router.post('/trajectory', createTrajectory);

router.patch('/trajectory/:type', updateTrajectory);

router.delete('/trajectory/:type', deleteTrajectory);

export default router;