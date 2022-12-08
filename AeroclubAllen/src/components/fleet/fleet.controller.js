import { somethingWentWrong500 } from "../../error/error.handler.js";

// Where fleet imgs are saved
import { AIRPLANE_IMG_ROUTE } from "../../config.js";

// Auditlog
import auditlog from "../auditlog/auditlog.dao.js";
import fleet from "./fleet.dao.js";

// Get Fleet, returns the fleet from x position and an 'n' ammount of airplanes
export const getFleet = async (req, res) => {
	const { x0, n } = req.query;

	try {
		if (Number.isInteger(parseInt(n)) && Number.isInteger(parseInt(x0))) {
			const rows = await fleet.getFleet(x0,n);
			res.json(rows);
		} else {
			res.status(400).send("Some variables are not integer as expected");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Get Airplane, returns just one airplane by plate
export const getAirplane = async (req, res) => {
	try {
		const airplane = await fleet.getAirplane(req.params);

		if (airplane.length === 0) {
			res.status(404).json({
				message: "Airplane not found",
			});
		} else {
			res.json(airplane[0]);
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Create Airplane, creates an airplane on the db
export const createAirplane = async (req, res) => {
	const { plate, name, engine, brand, model, speed, consumption, imgName } = JSON.parse(req.body.data);

	if (
		plate == null ||
		name == null ||
		engine == null ||
		brand == null ||
		model == null ||
		speed == null ||
		consumption == null ||
		imgName == null
	) {
		res.status(400).json({
			message: "Some data is null",
		});
	} else {
		if (Number.isInteger(parseInt(speed)) && Number.isInteger(parseInt(consumption))) {
			const imgRoute = AIRPLANE_IMG_ROUTE + "/" + name + "/" + imgName;

			try {
				await fleet.createAirplane(plate, name, engine, brand, model, speed, consumption, imgRoute);

				await auditlog.createLog(req.user.dni, "creation", "fleet", plate);

				res.send("success");
			} catch (e) {
				if ((e.code = "ER_DUP_ENTRY")) {
					return res.status(500).json({
						message: "Error, duplicated plate",
					});
				} else {
					somethingWentWrong500(e, res);
				}
			}
		} else {
			res.status(400).send("Some variables are not integer as expected");
		}
	}
};

// Update Airplane, modifies the info of an existing airplane
export const updateAirplane = async (req, res) => {
	const { plate } = req.params;
	const { name, engine, brand, model, speed, consumption, imgName } = JSON.parse(req.body.data);

	if (
		(speed == null || Number.isInteger(parseInt(speed))) &&
		(consumption == null || Number.isInteger(parseInt(consumption)))
	) {
		try {
			// If imgName is undefined (no img sent), sents a NULL in imgRoute to the DAO
			let dbRes = null;
			if(imgName == undefined){
				dbRes = await fleet.updateAirplane(name, engine, brand, model, speed, consumption, null, plate);
			} else {
				dbRes = await fleet.updateAirplane(name, engine, brand, model, speed, consumption, (AIRPLANE_IMG_ROUTE + "/" + name + "/" + imgName), plate);
			}

			if (dbRes.affectedRows === 0) {
				return res.status(404).json({
					message: "Airplane not found",
				});
			} else {
				await auditlog.createLog(req.user.dni, "modification", "fleet", plate);
				
				res.send("success");
			}
		} catch (e) {
			somethingWentWrong500(e, res);
		}
	} else {
		res.status(400).send("Some variables are not integer as expected");
	}
};

// Delete Airplane, deletes a given plate airplane from de db
export const deleteAirplane = async (req, res) => {
	const { plate } = req.params;

	try {
		const dbRes = await fleet.deleteAirplane(plate);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Airplane not found",
			});
		} else {
			await createLog(req.user.dni, "deletion", "fleet", plate);
			res.send("Airplane Deleted");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};
