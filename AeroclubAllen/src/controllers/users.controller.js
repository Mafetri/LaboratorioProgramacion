// Data Base
import { pool } from "../db.js";

import { somethingWentWrong500 } from "../error/error.handler.js";

// Get Users
export const getUsers = async (req, res) => {
    try {
		const [ rows ] = await pool.query(
			"SELECT dni, name, surname, role FROM users"
		);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
}

// Create User
export const createUser = async (req, res) => {
	const { dni, role } = req.body;

    if (dni == "" || role == "") {
		res.status(400).json({
			message: "Some data is wrong",
		});
	} else {
		try {
			await pool.query(
				"INSERT INTO users (dni, role, password) VALUES (?,?,?)",
				[dni, role, 'newuser'],
			);
			res.send("Post Success");
		} catch (e) {
			if ((e.code = "ER_DUP_ENTRY")) {
                return res.status(500).json({
                    message: "Error, duplicated DNI",
                });
            } else {
                somethingWentWrong500(e, res);
            }
		}
	}
};