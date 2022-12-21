import { Router } from "express";
import { isLoggedIn, isAdminOrSecretary } from "../../lib/auth.js";
import { getRates, addRate } from "./rates.controller.js";

const router = Router();

// Get Rates
router.get("/rates", isLoggedIn, getRates);

// Add Rate
router.post("/rates", isLoggedIn, isAdminOrSecretary, addRate);

export default router;