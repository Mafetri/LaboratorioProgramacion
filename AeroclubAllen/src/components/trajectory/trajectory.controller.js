import trajectory from "./trajectory.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";

// Get Trajectory
export const getTrajectory = async (req, res) => {
    try {
		const rows = await trajectory.getTrajectories();
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
			await createTrajectory(type, data, icon);

			await auditlog.createLog(req.user.dni, "creation", "trajectory", type);

			res.send("success");
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
		const dbRes = await trajectory.updateTrajectory (type, data, icon);

		if (dbRes.affectedRows === 0){
            return res.status(404).json({
				message: "Trajectory type not found",
			});
        } else{
			await auditlog.createLog(req.user.dni, "modification", "trajectory", type);
            res.send("success");
        }
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Delete Trajectory Type
export const deleteTrajectory = async (req, res) => {
	const { type } = req.params;

	try {
		const dbRes = await trajectory.deleteTrajectory(type);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Trajectory type not found",
			});
		} else {
			await auditlog.createLog(req.user.dni, "deletion", "trajectory", type);
			res.send("success");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};