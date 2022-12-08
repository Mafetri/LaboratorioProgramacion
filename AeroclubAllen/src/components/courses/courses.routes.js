import { Router } from "express";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from "./courses.controller.js";
import { isLoggedIn } from "../../lib/auth.js";

const router = Router();

router.get('/courses', getCourses); 

router.get('/courses/:course_class', getCourse); 

router.post('/courses', isLoggedIn, createCourse);

router.patch('/courses/:course_class', isLoggedIn, updateCourse);

router.delete('/courses/:course_class', isLoggedIn, deleteCourse);

export default router;