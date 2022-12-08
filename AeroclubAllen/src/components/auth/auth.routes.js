import { Router } from "express";
import { isLoggedIn, isNotLoggedIn, canEnterDashboard } from "../../lib/auth.js";
import { passportSignup , sendSing, passportSignin, logout, sendDashboard, getUserRole, sendUserPage } from "./auth.controller.js";

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
router.get("/dashboard", isLoggedIn, canEnterDashboard, sendDashboard);

// User Page
router.get("/userPage", isLoggedIn, sendUserPage);

// User Role
router.get("/userRole", isLoggedIn, getUserRole);

export default router;
