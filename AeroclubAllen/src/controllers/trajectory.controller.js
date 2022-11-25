// Data Base
import { pool } from "../db.js";

// Get Trajectory
export const getTrajectory = async (req, res) => {
    try {
		const [ rows ] = await pool.query(
			"SELECT * FROM trajectory"
		);
		res.json(rows);
	} catch (e) {
		return res.status(500).json({
			message: "Something went wrong",
			error: e,
		});
	}
}

// Create Trajectory Data
export const createTrajectory = async (req, res) => {
    const { type, data, icon } = req.body;

	if( type == null || data == null || icon == null ){
		res.status(400).json({
			message: "Some data is null",
		});
	} else {
		try {
			await pool.query(
				"INSERT INTO trajectory (type, data, icon) VALUES (?,?,?)",
				[type, data, icon],
			);
			res.send("Post Success");
		} catch (e) {
			if ((e.code = "ER_DUP_ENTRY")) {
				return res.status(500).json({
					message: "Error, type",
				});
			} else {
				return res.status(500).json({
					message: "Something went wrong",
					error: e,
				});
			}
		}
	}
}

// Update Trajectory
export const updateTrajectory = async (req, res) => {
	const { type } = req.params;
	const { data, icon } = req.body;

	try {
		const [dbRes] = await pool.query(
			"UPDATE trajectory SET data = IFNULL(?, data), icon = IFNULL(?, icon) WHERE type = ?",
			[data, icon, type]
		);

		if (dbRes.affectedRows === 0){
            return res.status(404).json({
				message: "Trajectory type not found",
			});
        } else{
            res.json((await pool.query("SELECT * FROM trajectory WHERE tpye = ?", [type]))[0]);
        }
	} catch (e) {
		return res.status(500).json({
			message: "Something went wrong",
			error: e,
		});
	}
};

// Delete Trajectory Type
export const deleteTrajectory = async (req, res) => {
	const { type } = req.params;

	try {
		const [dbRes] = await pool.query("DELETE FROM trajectory WHERE type=?", [type]);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Trajectory type not found",
			});
		} else {
			res.send("Trajectory Deleted");
		}
	} catch (e) {
		return res.status(500).json({
			message: "Error",
			error: e,
		});
	}
};