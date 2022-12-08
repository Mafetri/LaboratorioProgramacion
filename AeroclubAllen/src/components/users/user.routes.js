import { Router } from "express";
import { isLoggedIn, isAdmin } from "../../lib/auth.js";
import { getUsers, createUser, deleteUser, updateUser, getUserLoggedin } from "./users.controller.js";

const router = Router();

// Get Users
router.get("/users", isLoggedIn, isAdmin, getUsers);

// Get User Logged In
router.get("/userLoggedin", getUserLoggedin);

// Create User
router.post("/user", isLoggedIn, isAdmin, createUser);

// Patch user
router.patch("/user/:dni", isLoggedIn, updateUser);

// Delete user
router.delete("/user/:dni", isLoggedIn, isAdmin, deleteUser);

export default router;