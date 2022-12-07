import { pool } from "../../db.js";

const courses = {};

// Get Courses
courses.getCourses = async () => {
	try {
        const [rows] = await pool.query("SELECT * FROM courses;");
        return rows;
	} catch (error) {
        console.log(error);
		throw error;
	}
};

// Get Course
courses.getCourse = async (course_class) => {
	try {
		const [rows] = await pool.query("SELECT FROM courses WHERE course_class=?", [course_class]);
		return rows;
	} catch (error) {
		throw error;
	}
};

// Create Course
courses.createCourse = async (course_class, age, duration, hours, studies, psychophysical, licenses) => {
	try {
        const [rows] = await pool.query(
			"INSERT INTO courses (course_class, age, duration, hours, studies, psychophysical, licenses) VALUES (?,?,?,?,?,?,?)",
			[course_class, age, duration, hours, studies, psychophysical, licenses],
		);
		return rows;
	} catch (error) {
		throw error;
	}
};
// Update Course
courses.updateCourse = async (age, duration, hours, studies, psychophysical, licenses, course_class) => {
	try {
		const [rows] = await pool.query(
			"UPDATE courses SET age = IFNULL(?, age), duration = IFNULL(?, duration), hours = IFNULL(?, hours), studies = IFNULL(?, studies), psychophysical = IFNULL(?, psychophysical), licenses = IFNULL(?, licenses) WHERE course_class = ?",
			[age, duration, hours, studies, psychophysical, licenses, course_class],
		);
	} catch (error) {}
};

// Delete news
courses.deleteCourse = async (course_class) => {
	try {
		const [rows] = await pool.query("DELETE FROM courses WHERE course_class=?", [course_class]);
        return rows;
	} catch (error) {
        throw error;
    }
};

export default courses;
