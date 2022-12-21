// DAO
import rates from "./rates.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";

// Get Rates
export const getRates = async (req, res) => {
    const { date } = req.query;
	try {
		let rows = await rates.getCurrentRates(date);

		// Saves on final an array of objects that contents an airplane_plate and the current rates
		let final = rows.reduce((acc, rate) => {
			// Check if there is already an entry for the plate in the accumulator array
			const plateIndex = acc.findIndex((item) => item.airplane_plate === rate.airplane_plate);

			if (plateIndex !== -1) {
			  	// If there is, push the rate object to the array of rates for that plate
				acc[plateIndex].rates.push({ start_date: rate.start_date, rate: rate.rate });
			} else {
			  	// If there isn't, create a new object in the accumulator array for the plate
			  	// with the plate and an array containing the rate object
				acc.push(
					{ 
						airplane_plate: rate.airplane_plate, 
						rates: [
							{ 
								start_date: rate.start_date, 
								rate: rate.rate 
							}
						] 
					}
				);
			}
			return acc;
		}, []);

		// Adds on final the future rates to each airplane
		rows = await rates.getFutureRates(date);
		final = rows.reduce((acc, rate) => {
			// Check if there is already an entry for the plate in the accumulator array
			const plateIndex = acc.findIndex((item) => item.airplane_plate === rate.airplane_plate);

			if (plateIndex !== -1) {
			  	// If there is, push the rate object to the array of rates for that plate
				acc[plateIndex].rates.push({ start_date: rate.start_date, rate: rate.rate });
			} else {
			  	// If there isn't, create a new object in the accumulator array for the plate
			  	// with the plate and an array containing the rate object
				acc.push(
					{ 
						airplane_plate: rate.airplane_plate, 
						rates: [
							{ 
								start_date: rate.start_date, 
								rate: rate.rate 
							}
						] 
					}
				);
			}
			return acc;
		}, final);

		res.json(final);
	} catch (e) {
		console.log(e);
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
