import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import { getUsers, createUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

// Get Users
router.get("/users", isLoggedIn, getUsers);

// Create User
router.post("/user", isLoggedIn, createUser);

// Delete user
router.delete("/users/:dni", isLoggedIn, deleteUser);

export default router;