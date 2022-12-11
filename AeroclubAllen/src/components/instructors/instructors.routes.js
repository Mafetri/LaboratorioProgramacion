import { Router } from "express";
import { getInstructorsAviability, getInstructorAviability, addAviability } from "./instructors.controller.js";
import { isLoggedIn } from "../../lib/auth.js";

const router = Router();

router.get('/instructors', isLoggedIn, getInstructorsAviability); 

router.get('/instructors/:dni', isLoggedIn, getInstructorAviability); 

router.post('/instructors', isLoggedIn, addAviability)

// router.post('/instructors/:dni', isLoggedIn, newInstructorAviability);

export default router;