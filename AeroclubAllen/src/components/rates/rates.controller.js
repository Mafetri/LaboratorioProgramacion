// DAO
import rates from "./rates.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";

// Get Rates
export const getRates = async (req, res) => {
    const { current, date } = req.query;
	try {
		let rows = null;
		if(current == "true"){
			rows = await rates.getCurrentRates(date);
		} else {
			rows = await rates.getFutureRates(date);
		}
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Add Rate
export const addRate = async (req, res) => {
	const {airplane, rate, startDate} = req.body;
	try {
		const rows = await rates.addRate(airplane, rate, startDate);
		res.send("success");
	} catch (error) {
		somethingWentWrong500(error, res);
	}
}
