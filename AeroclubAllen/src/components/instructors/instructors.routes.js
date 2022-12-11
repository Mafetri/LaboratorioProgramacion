import { Router } from "express";
import { getInstructosAviability } from "./instructors.controller.js";
import { isLoggedIn } from "../../lib/auth.js";

const router = Router();

router.get('/instructors', isLoggedIn, getInstructosAviability); 

// router.post('/instructors/:dni', isLoggedIn, newInstructorAviability);

export default router;