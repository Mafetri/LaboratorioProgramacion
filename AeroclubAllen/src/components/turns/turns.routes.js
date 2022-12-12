import { Router } from "express";

import { isLoggedIn } from "../../lib/auth.js";
import { setStatus, getTurns, createTurn, getTurnsUser, deleteTurn } from "./turns.controller.js";

const router = Router();

router.get('/turns', isLoggedIn, getTurns);

router.get('/turns/:dni', isLoggedIn, getTurnsUser)

router.patch('/turns/:id', isLoggedIn, setStatus);

router.post('/turns', isLoggedIn, createTurn);

router.delete('/turns/:id', isLoggedIn, deleteTurn);

export default router;