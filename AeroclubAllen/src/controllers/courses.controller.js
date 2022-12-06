// Data Base
import { pool } from "../db.js";
import { somethingWentWrong500 } from "../error/error.handler.js";

// Get Courses
export const getCourses = async (req, res) => {
	try {
		const [ rows ] = await pool.query(
			"SELECT * FROM courses"
		);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Get Course
export const getCourse = async (req, res) => {
	const { course_class } = req.params;

	try {
		const [course] = await pool.query("SELECT FROM courses WHERE course_class=?", [course_class]);

		if (course.length === 0) {
			res.status(400).json({
				message: "Course not found",
			});
		} else {
			res.json(course[0]);
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Create Course
export const createCourse = async (req, res) => {
	const { course_class, age, duration, hours, studies, psychophysical, licenses } = req.body;

	if (course_class == null || age == null || duration == null || hours == null || studies == null || psychophysical == null || licenses == null ) {
		res.status(400).json({
			message: "Some data is null",
		});
	} else {
		try {
			await pool.query(
				"INSERT INTO courses (course_class, age, duration, hours, studies, psychophysical, licenses) VALUES (?,?,?,?,?,?,?)",
				[course_class, age, duration, hours, studies, psychophysical, licenses],
			);
			res.send("Post Success");
		} catch (e) {
			if ((e.code = "ER_DUP_ENTRY")) {
				return res.status(500).json({
					message: "Error, duplicated course class",
				});
			} else {
				somethingWentWrong500(e, res);
			}
		}
	}
};

// Update Course
export const updateCourse = async (req, res) => {
	const { course_class } = req.params;
	const { age, duration, hours, studies, psychophysical, licenses } = req.body;

	try {
		const [dbRes] = await pool.query(
			"UPDATE courses SET age = IFNULL(?, age), duration = IFNULL(?, duration), hours = IFNULL(?, hours), studies = IFNULL(?, studies), psychophysical = IFNULL(?, psychophysical), licenses = IFNULL(?, licenses) WHERE course_class = ?",
			[age, duration, hours, studies, psychophysical, licenses, course_class]
		);

		if (dbRes.affectedRows === 0){
            return res.status(404).json({
				message: "Course not found",
			});
        } else{
            res.json((await pool.query("SELECT * FROM courses WHERE course_class = ?", [course_class]))[0]);
        }
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Delete news
export const deleteCourse = async (req, res) => {
	const { course_class } = req.params;

	try {
		const [dbRes] = await pool.query("DELETE FROM courses WHERE course_class=?", [course_class]);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Course not found",
			});
		} else {
			res.send("Course Deleted");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};