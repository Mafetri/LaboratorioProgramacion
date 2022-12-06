import { Router } from "express";
import { isLoggedIn, isAdmin } from "../../lib/auth.js";
import { getUsers, createUser, deleteUser, updateUser } from "./users.controller.js";

const router = Router();

// Get Users
router.get("/users", isLoggedIn, isAdmin, getUsers);

// Create User
router.post("/user", isLoggedIn, isAdmin, createUser);

// Patch user
router.patch("/user/:dni", isLoggedIn, isAdmin, updateUser);

// Delete user
router.delete("/user/:dni", isLoggedIn, isAdmin, deleteUser);

export default router;