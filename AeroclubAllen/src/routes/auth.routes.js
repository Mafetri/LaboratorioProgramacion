import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../lib/auth.js";
import { sendSignup, passportSignup , sendSingin, passportSignin, logout, sendDashboard } from "../controllers/auth.controller.js";

const router = Router();

// Sign Up
router.get("/signup", isNotLoggedIn, sendSignup);
router.post("/signup", isNotLoggedIn, passportSignup);

// Sing In
router.get("/signin", isNotLoggedIn, sendSingin);
router.post("/signin", isNotLoggedIn, passportSignin);

// Log out
router.get("/logout", isLoggedIn, logout);

// Dashboard
router.get("/dashboard", isLoggedIn, sendDashboard);

export default router;
