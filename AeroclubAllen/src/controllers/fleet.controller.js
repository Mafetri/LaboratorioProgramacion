// Data Base
import { pool } from "../db.js";
import { somethingWentWrong500 } from "../error/error.handler.js";

// Where fleet imgs are saved
import { AIRPLANE_IMG_ROUTE } from "../config.js";

// Auditlog
import { createLog } from "../services/auditlog/auditlog.dao.js";

// Get Fleet, returns the fleet from x position and an 'n' ammount of airplanes
export const getFleet = async (req, res) => {
	const { x0, n } = req.query;

	try {
		if (Number.isInteger(parseInt(n)) && Number.isInteger(parseInt(x0))) {
			const [rows] = await pool.query("SELECT * FROM fleet LIMIT ?,?", [parseInt(x0), parseInt(n)]);
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
		const [airplane] = await pool.query("SELECT * FROM fleet WHERE plate = ?", [req.params.plate]);

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
				await pool.query(
					"INSERT INTO fleet (plate, name, engine, brand, model, speed, consumption, img) VALUES (?,?,?,?,?,?,?,?)",
					[plate, name, engine, brand, model, speed, consumption, imgRoute],
				);

				await createLog(req.user.dni, "creation", "fleet", plate);

				res.send("Post Success");
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
		// If imgName is undefined (no img sent), then it gives a null imgRoute to sql
		let imgRoute = null;
		if (imgName != undefined) {
			imgRoute = AIRPLANE_IMG_ROUTE + "/" + name + "/" + imgName;
		}

		try {
			const [dbRes] = await pool.query(
				"UPDATE fleet SET name = IFNULL(?, name), engine = IFNULL(?, engine), brand = IFNULL(?, brand), model = IFNULL(?, model), speed = IFNULL(?, speed), consumption = IFNULL(?, consumption), img = IFNULL(?, img) WHERE plate = ?",
				[name, engine, brand, model, speed, consumption, imgRoute, plate],
			);

			if (dbRes.affectedRows === 0) {
				return res.status(404).json({
					message: "Airplane not found",
				});
			} else {
				await createLog(req.user.dni, "modification", "fleet", plate);
				
				res.json((await pool.query("SELECT * FROM fleet WHERE plate = ?", [plate]))[0]);
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
		const [dbRes] = await pool.query("DELETE FROM fleet WHERE plate=?", [plate]);

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
