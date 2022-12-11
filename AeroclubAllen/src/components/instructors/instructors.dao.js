import { pool } from "../../db.js";

const instructros = {};

// Get Instructors Aviability
instructros.getInstructorsAviability = async () => {
	try {
		const [rows] = await pool.query("SELECT * FROM instructors_availability ORDER BY start_date DESC");
		return rows;
	} catch (error) {
		throw error;
	}
};

export default instructros;
