import { pool } from "../../db.js";
import { getInstructorsAviability } from "./instructors.controller.js";

const instructors = {};

// Get Instructors Aviability
instructors.getInstructorsAviability = async () => {
	try {
		const [rows] = await pool.query("SELECT instructors_availability.*, users.name, users.surname FROM instructors_availability JOIN users ON instructors_availability.instructor_dni = users.dni ORDER BY instructors_availability.start_date DESC");
		return rows;
	} catch (error) {
		throw error;
	}
};

// Get Instructor Aviability
instructors.getInstructorAviability = async (dni) => {
	try {
		const [rows] = await pool.query("SELECT instructors_availability.*, users.name, users.surname FROM instructors_availability JOIN users ON instructors_availability.instructor_dni = users.dni WHERE instructor_dni = 3622662", [
			dni,
		]);
		return rows;
	} catch (error) {
		throw error;
	}
};

instructors.addAviability = async (startDate, endDate, dni) => {
	try {
		const [rows] = await pool.query("INSERT INTO instructors_availability VALUE (NULL, ?, ?, ?)", [
			dni,
			startDate,
			endDate,
		]);
		return rows;
	} catch (error) {
		throw error;
	}
};

export default instructors;
