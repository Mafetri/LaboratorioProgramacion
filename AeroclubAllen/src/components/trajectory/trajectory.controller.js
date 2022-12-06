// Data Base
import { pool } from "../../db.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";

// Get Trajectory
export const getTrajectory = async (req, res) => {
    try {
		const [ rows ] = await pool.query(
			"SELECT * FROM trajectory"
		);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
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
			await createLog(req.user.dni, "creation", "trajectory", type);
			res.send("Post Success");
		} catch (e) {
			if ((e.code = "ER_DUP_ENTRY")) {
				return res.status(500).json({
					message: "Error, type",
				});
			} else {
				somethingWentWrong500(e, res);
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
			await createLog(req.user.dni, "modification", "trajectory", type);
            res.json((await pool.query("SELECT * FROM trajectory WHERE tpye = ?", [type]))[0]);
        }
	} catch (e) {
		somethingWentWrong500(e, res);
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
			await createLog(req.user.dni, "deletion", "trajectory", type);
			res.send("Trajectory Deleted");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};