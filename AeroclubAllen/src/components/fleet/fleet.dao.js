import { pool } from "../../db.js";

const fleet = {};

// Get Fleet
fleet.getFleet = async (x0, n) => {
	try {
		const [rows] = await pool.query("SELECT * FROM fleet LIMIT ?,?", [parseInt(x0), parseInt(n)]);
		return rows;
	} catch (error) {
		throw error;
	}
};

// Get Airplane
fleet.getAirplane = async (plate) => {
	try {
		const [rows] = await pool.query("SELECT * FROM fleet WHERE plate = ?", [req.params.plate]);
		return rows;
	} catch (error) {
		throw error;
	}
};

// Create Airplane
fleet.createAirplane = async (plate, name, engine, brand, model, speed, consumption, imgRoute) => {
	try {
		const [dbRes] = await pool.query(
			"INSERT INTO fleet (plate, name, engine, brand, model, speed, consumption, img) VALUES (?,?,?,?,?,?,?,?)",
			[plate, name, engine, brand, model, speed, consumption, imgRoute],
		);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

// Update Airplane
fleet.updateAirplane = async (name, engine, brand, model, speed, consumption, imgRoute, plate) => {
	try {
		const [dbRes] = await pool.query(
			"UPDATE fleet SET name = IFNULL(?, name), engine = IFNULL(?, engine), brand = IFNULL(?, brand), model = IFNULL(?, model), speed = IFNULL(?, speed), consumption = IFNULL(?, consumption), img = IFNULL(?, img) WHERE plate = ?",
			[name, engine, brand, model, speed, consumption, imgRoute, plate],
		);
	} catch (error) {
		throw error;
	}
};

// Delete Airplane
fleet.deleteAirplane = async (plate) => {
	try {
		const [dbRes] = await pool.query("DELETE FROM fleet WHERE plate=?", [plate]);
	} catch (error) {
		throw error;
	}
};
export default fleet;
