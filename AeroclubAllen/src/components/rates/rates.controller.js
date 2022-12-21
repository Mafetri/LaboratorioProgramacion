// DAO
import rates from "./rates.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";

// Get Rates
export const getRates = async (req, res) => {
    const {startDate, plate} = req.query;
	try {
		const rows = await rates.getRates(startDate, plate);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};
