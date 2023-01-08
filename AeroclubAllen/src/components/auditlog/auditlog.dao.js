import { pool } from "../../db.js";
import {DAYS_UNTIL_CLEAN} from "../../config.js";

const auditlog = {};

// Get Auditlog
auditlog.getAuditlog = async (x0, n) => {
	try {
		const [rows] = await pool.query("SELECT auditlog.date, auditlog.description, auditlog.table_name, auditlog.primary_key_changed, users.name, users.surname FROM auditlog JOIN users ON auditlog.user_dni = users.dni ORDER BY date DESC LIMIT ?,?", [
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

// Delete Past Logs
auditlog.deletePastLogs = async () => {
	try {
		const [rows] = await pool.query("DELETE FROM auditlog WHERE end_date < DATE_SUB(CURDATE(), INTERVAL ? DAYS)", [DAYS_UNTIL_CLEAN]);
		return rows;
	} catch (error) {
		throw error;
	}
}

export default auditlog;