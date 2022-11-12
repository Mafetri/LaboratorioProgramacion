import { Router } from "express";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from "../controllers/courses.controller.js";

const router = Router();

router.get('/courses', getCourses); 

router.get('/courses/:course_class', getCourse); 

router.post('/courses', createCourse);

router.patch('/courses/:course_class', updateCourse);

router.delete('/courses/:course_class', deleteCourse);

export default router;