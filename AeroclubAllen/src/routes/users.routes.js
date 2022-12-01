import { Router } from "express";
import { isLoggedIn, isNotLoggedIn } from "../lib/auth.js";
import { sendSignup, passportSignup , sendSingin, passportSignin, logout, sendDashboard, getUsers, createUser } from "../controllers/users.controller.js";
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

// Get Users
router.get("/api/users", isLoggedIn, getUsers);

// Create User
router.post("/api/user", isLoggedIn, createUser);

export default router;
