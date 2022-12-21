import { pool } from "../../db.js";

const rates = {};

rates.getCurrentRates = async (date) => {
    try {
        const [rows]  = await pool.query("SELECT * FROM rates WHERE start_date = (SELECT MAX(start_date) FROM rates r2 WHERE r2.airplane_plate = rates.airplane_plate AND start_date <= ?) ORDER BY airplane_plate;", [date]);
        return rows;
    } catch (e){
        throw e;
    }
}

rates.getFutureRates = async (date) => {
    try {
        const [rows]  = await pool.query("SELECT * FROM rates WHERE start_date > ? ORDER BY start_date ASC;", [date]);
        return rows;
    } catch (e){
        throw e;
    }
}

rates.addRate = async (airplane, rate, date) => {
    try {
        const [rows] = await pool.query("INSERT INTO rates VALUES (NULL, ?, ?, ?)", [date, rate, airplane]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export default rates;