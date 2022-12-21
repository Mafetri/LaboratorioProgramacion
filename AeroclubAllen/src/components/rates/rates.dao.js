import { pool } from "../../db.js";

const rates = {};

rates.getRates = async (startDate, plate) => {
    try {
        if(plate == undefined){
            const [rows] = await pool.query("SELECT * FROM rates WHERE start_date <= ? ORDER BY start_date DESC", [startDate]);
            return rows;
        }
        const [rows] = await pool.query("SELECT * FROM rates WHERE airplane_plate = ? AND start_date <= ? ORDER BY start_date DESC LIMIT 1", [plate, startDate]);
        return rows;
	} catch (error) {
		throw error;
	}
};

export default rates;