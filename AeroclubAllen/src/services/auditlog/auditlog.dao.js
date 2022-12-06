import { pool } from "../../db.js";

const auditlog = {};

// Get Auditlog
auditlog.getAuditlog = async (x0, n) => {
	try {
		const [rows] = await pool.query("SELECT * FROM auditlog ORDER BY date DESC LIMIT ?,?", [
			parseInt(x0),
			parseInt(n),
		]);
		return rows;
	} catch (e) {
		throw e;
	}
}


// Create a log
auditlog.createLog = async (user_dni, description, table_name, primary_key_changed) => {
	try {
		await pool.query(
			"INSERT INTO auditlog (date, user_dni, description, table_name, primary_key_changed) VALUES (?,?,?,?,?);",
			[new Date(), user_dni, description, table_name, primary_key_changed],
		);
	} catch (e) {
		throw e;
	}
};

export default auditlog;