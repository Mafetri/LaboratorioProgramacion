import { Router } from "express";
import { isLoggedIn, isAdmin } from "../../lib/auth.js";
import { getRates } from "./rates.controller.js";

const router = Router();

// Get Rates
router.get("/rates", isLoggedIn, getRates);

export default router;