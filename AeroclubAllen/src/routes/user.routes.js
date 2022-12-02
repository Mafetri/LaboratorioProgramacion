import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import { getUsers, createUser, deleteUser, updateUser } from "../controllers/users.controller.js";

const router = Router();

// Get Users
router.get("/users", isLoggedIn, getUsers);

// Create User
router.post("/user", isLoggedIn, createUser);

// Patch user
router.patch("/user/:dni", isLoggedIn, updateUser);

// Delete user
router.delete("/user/:dni", isLoggedIn, deleteUser);

export default router;