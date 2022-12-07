import { pool } from "../../db.js";

const trajectory = {};

trajectory.getTrajectories = async () => {
	try {
		const [rows] = await pool.query("SELECT * FROM trajectory");
		return rows;
	} catch (error) {
		throw error;
	}
};

trajectory.getTrajectory = async (type) => {
	try {
		const [trajectory] = await pool.query("SELECT * FROM trajectory WHERE tpye = ?", [type]);
		return trajectory;
	} catch (error) {
		throw error;
	}
};

trajectory.createTrajectory = async (type, data, icon) => {
	try {
		await pool.query("INSERT INTO trajectory (type, data, icon) VALUES (?,?,?)", [type, data, icon]);
	} catch (error) {
		throw error;
	}
};

trajectory.updateTrajectory = async (type, data, icon) => {
	try {
		const [dbRes] = await pool.query(
			"UPDATE trajectory SET data = IFNULL(?, data), icon = IFNULL(?, icon) WHERE type = ?",
			[data, icon, type],
		);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

trajectory.deleteTrajectory = async (type) => {
	try {
		const [dbRes] = await pool.query("DELETE FROM trajectory WHERE type=?", [type]);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

export default trajectory;
