import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import { getUsers, createUser } from "../controllers/users.controller.js";

const router = Router();

// Get Users
router.get("/users", isLoggedIn, getUsers);

// Create User
router.post("/user", isLoggedIn, createUser);

export default router;