import { pool } from "../../db.js";

// Create a log
export const createLog = async (user_dni, description, table_name, primary_key_changed) => {
	try {
		await pool.query(
			"INSERT INTO auditlog (date, user_dni, description, table_name, primary_key_changed) VALUES (?,?,?,?,?);",
			[new Date(), user_dni, description, table_name, primary_key_changed],
		);
	} catch (e) {
		throw e;
	}
};