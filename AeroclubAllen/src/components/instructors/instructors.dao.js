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
		const [rows] = await pool.query("SELECT instructors_availability.*, users.name, users.surname FROM instructors_availability JOIN users ON instructors_availability.instructor_dni = users.dni WHERE instructor_dni = ?", [
			dni,
		]);
		return rows;
	} catch (error) {
		throw error;
	}
};

instructors.addAviability = async (startDate, endDate, dni) => {
	try {
		const [rows] = await pool.query("INSERT INTO instructors_availability VALUES (NULL, ?, ?, ?)", [
			dni,
			startDate,
			endDate,
		]);
		return rows;
	} catch (error) {
		throw error;
	}
};

instructors.getInstructorsAvailable = async (startDate, endDate) => {
	try {
		const [rows] = await pool.query ("SELECT * FROM instructors_availability WHERE instructors_availability.start_date <= ? AND instructors_availability.end_date >= ? AND NOT EXISTS(SELECT * FROM turns WHERE (turns.approved = 1 OR turns.approved IS NULL) AND turns.instructor_dni = instructors_availability.instructor_dni AND ? < turns.end_date AND ? > turns.start_date)", [startDate, endDate, startDate, endDate]);
		return rows;
	} catch (error) {
		throw error;
	}
}

instructors.orderByAmountOfTurns = async () => {
	try {
		const [rows] = await pool.query ("SELECT instructor_dni, COUNT(*) AS amount FROM turns WHERE (turns.approved = 1 OR turns.approved IS NULL) GROUP BY instructor_dni ORDER BY amount ASC;");
		return rows;
	} catch (error) {
		throw error;
	}
}

instructors.getInstructorsAvailableOrdered = async (startDate, endDate) => {
	try {
		const [rows] = await pool.query("SELECT instructors_availability.instructor_dni, COUNT(turns.instructor_dni) AS amount FROM instructors_availability LEFT JOIN turns ON turns.instructor_dni = instructors_availability.instructor_dni WHERE instructors_availability.start_date <= ? AND instructors_availability.end_date >= ? AND NOT EXISTS(SELECT * FROM turns WHERE (turns.approved = 1 OR turns.approved IS NULL) AND turns.instructor_dni = instructors_availability.instructor_dni AND ? < turns.end_date AND ? > turns.start_date) GROUP BY instructors_availability.instructor_dni ORDER BY amount ASC;", [startDate, endDate, startDate, endDate]);
		return rows;
	} catch (error) {
		throw error;
	}
}

export default instructors;
