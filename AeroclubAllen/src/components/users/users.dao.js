import { pool } from "../../db.js";

const users = {};

users.getUsers = async (importants) => {
	try {
		if( importants == "true"){
			const [rows] = await pool.query("SELECT dni, name, surname, role, email, phone FROM users WHERE role NOT IN('pilot', 'student') ORDER BY FIELD(role, 'admin', 'editor', 'instructor', 'secretary'), surname DESC;");
			return rows;
		}

		const [rows] = await pool.query("SELECT dni, name, surname, role, email, phone FROM users WHERE role IN('pilot', 'student') ORDER BY surname ASC;");
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
		await pool.query("INSERT INTO users (dni, role, password) VALUES (?,?,?)", [dni, role, "newuser"]);
	} catch (error) {
		throw error;
	}
};

users.updateUser = async (name, surname, role, phone, email, dni) => {
	try {
		const [dbRes] = await pool.query(
			"UPDATE users SET name = IFNULL(?, name), surname = IFNULL(?, surname), role = IFNULL(?, role), phone = IFNULL(?, phone), email = IFNULL(?, email) WHERE dni = ?",
			[name, surname, role, phone, email, dni],
		);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

users.deleteUser = async (dni) => {
	try {
		const [dbRes] = await pool.query("DELETE FROM users WHERE dni=?", [dni]);
		return dbRes;
	} catch (error) {
		throw error;
	}
};

export default users;
