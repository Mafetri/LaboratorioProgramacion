// DAO
import users from "./users.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";
import { isAdmin } from "../../lib/auth.js";

// Get Users
export const getUsers = async (req, res) => {
	const { importants } = req.query;

	try {
		const rows = await users.getUsers(importants);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Create User
export const createUser = async (req, res) => {
	const { dni, role } = req.body;

	if (dni == "" || role == "") {
		res.status(400).json({
			message: "Some data is wrong",
		});
	} else {
		try {
			await users.createUser(dni, role);

			await auditlog.createLog(req.user.dni, "creation", "users", dni);
			
			res.send("success");
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

// Update User
export const updateUser = async (req, res) => {
	const { dni } = req.params;
	const { name, surname, role, phone, email } = req.body;

	if(dni == req.user.dni || req.user.role == "admin"){
		try {
			const dbRes = await users.updateUser(name, surname, role, phone, email, dni);
	
			if (dbRes.affectedRows === 0) {
				return res.status(404).json({
					message: "User not found",
				});
			} else {
				await auditlog.createLog(req.user.dni, "modification", "users", dni);
	
				res.send("success");
			}
		} catch (e) {
			console.log(e);
			somethingWentWrong500(e, res);
		}
	} else {
		return res.status(400).json({
			message: "Only admins can change other users info",
		});
	}
	
};

// Delete User
export const deleteUser = async (req, res) => {
	const { dni } = req.params;

	if (req.user.dni != dni) {
		try {
			const dbRes = users.deleteUser(dni);

			if (dbRes.affectedRows === 0) {
				return res.status(404).json({
					message: "User not found",
				});
			} else {
				await auditlog.createLog(req.user.dni, "deletion", "users", dni);
				res.send("seccess");
			}
		} catch (e) {
			somethingWentWrong500(e, res);
		}
	} else {
		res.status(400).json({
			message: "Can't delete yourself",
		});
	}
};


export const getUserLoggedin = async (req, res) => {
	try {
		const user = await users.getUser(req.user.dni);
		res.json(user[0]);
	} catch (error) {
		
	}
}