import { pool } from "../../db.js";

const users = {};

users.getUsers = async () => {
	try {
		const [rows] = await pool.query("SELECT dni, name, surname, role FROM users");
		return rows;
	} catch (error) {
		throw error;
	}
};

users.getUser = async (dni) => {
	try {
		const [user] = await pool.query("SELECT dni, name, surname, role, email, phone FROM users WHERE dni = ?", [dni]);
		return user;
	} catch (error) {
		throw error;
	}
};

users.createUser = async (dni, role) => {
	try {
		pool.query("INSERT INTO users (dni, role, password) VALUES (?,?,?)", [dni, role, "newuser"]);
	} catch (error) {
		throw error;
	}
};

users.updateUser = async (type, data, icon) => {
	try {
		const [dbRes] = await pool.query(
			"UPDATE users SET name = IFNULL(?, name), surname = IFNULL(?, surname), role = IFNULL(?, role) WHERE dni = ?",
			[name, surname, role, dni],
		);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

users.deleteUser = async (type) => {
	try {
		const [dbRes] = await pool.query("DELETE FROM trajectory WHERE type=?", [type]);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

export default users;
