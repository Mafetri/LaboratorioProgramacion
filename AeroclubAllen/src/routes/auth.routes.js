import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../lib/auth.js";
import { passportSignup , sendSing, passportSignin, logout, sendDashboard } from "../controllers/auth.controller.js";

const router = Router();

// Sign
router.get("/sign", isNotLoggedIn, sendSing);

// Sign Up
router.post("/signup", isNotLoggedIn, passportSignup);

// Sing In
router.post("/signin", isNotLoggedIn, passportSignin);

// Log out
router.get("/logout", isLoggedIn, logout);

// Dashboard
router.get("/dashboard", isLoggedIn, sendDashboard);

export default router;
