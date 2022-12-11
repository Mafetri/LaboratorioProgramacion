import turns from "./turns.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";

// Get Turns
export const getTurns = async (req, res) => {
	const { approved } = req.query;
	try {
		const rows = await turns.getTurns(approved);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Set Status
export const setStatus = async (req, res) => {
	const { id } = req.params;
	const { result } = req.query;

	try {
		const dbRes = await turns.setResult(id, result);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Turn not found",
			});
		} else {
			await auditlog.createLog(req.user.dni, "approved", "turns", id);
			res.send("success");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Reserve Turn
export const createTurn = async (req, res) => {
	const { startDate, endDate, airplane, instructor, purpose } = req.body;

	try {
		const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, instructor, purpose);
		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Couldent reserve turn",
			});
		} else {
			res.send("success");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};
