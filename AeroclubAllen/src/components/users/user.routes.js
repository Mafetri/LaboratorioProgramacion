import { Router } from "express";
import { isLoggedIn, isAdmin } from "../../lib/auth.js";
import { getUsers, createUser, deleteUser, updateUser, getUserLoggedin, getDisabledUsers, getInstructors } from "./users.controller.js";

const router = Router();

// Get Users
router.get("/users", isLoggedIn, isAdmin, getUsers);

// Get User Logged In
router.get("/userLoggedin", getUserLoggedin);

// Get Disabled Users
router.get("/disabledUsers", isLoggedIn, getDisabledUsers);

// Get Instructor Users
router.get("/usersInstructors", isLoggedIn, getInstructors);

// Create User
router.post("/user", isLoggedIn, isAdmin, createUser);

// Patch user
router.patch("/user/:dni", isLoggedIn, updateUser);

// Delete user
router.delete("/user/:dni", isLoggedIn, isAdmin, deleteUser);

export default router;