import { Router } from "express";
import { getTrajectory, createTrajectory, updateTrajectory, deleteTrajectory } from "./trajectory.controller.js";
import { isLoggedIn } from "../../lib/auth.js";

const router = Router();

router.get('/trajectory', getTrajectory); 

router.post('/trajectory', isLoggedIn, createTrajectory);

router.patch('/trajectory/:type', isLoggedIn, updateTrajectory);

router.delete('/trajectory/:type', isLoggedIn, deleteTrajectory);

export default router;