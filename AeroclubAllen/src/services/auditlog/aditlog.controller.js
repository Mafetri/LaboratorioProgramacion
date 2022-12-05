// Data Base
import { pool } from "../../db.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";

// Get Auditlog
export const getAuditlog = async (req, res) => {
	const { x0, n } = req.query;

	try {
		if(Number.isInteger(parseInt(n)) && Number.isInteger(parseInt(x0))){
			const [rows] = await pool.query(
				"SELECT * FROM auditlog ORDER BY date DESC LIMIT ?,?",
				[parseInt(x0), parseInt(n)],
			);
			res.json(rows);
		} else {
			res.status(400).send("Some variables are not integer as expected");
		}
	} catch (e) {
        somethingWentWrong500(e, res);
	}
};