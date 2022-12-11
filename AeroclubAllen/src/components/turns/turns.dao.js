import { pool } from "../../db.js";

const turns = {};

turns.getTurns = async (approved) => {
	try {
        // If approved is undefined, it searchs the turns that hasn't been revised yet
        if(approved == "unchecked") {
            const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns LEFT JOIN users u ON turns.user_dni = u.dni LEFT JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved IS NULL ORDER BY turns.request_date DESC");
            return rows;
        }

        // If approved is true, then it returns the approved turns, else, it returns the false ones
        const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns LEFT JOIN users u ON turns.user_dni = u.dni LEFT JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved = ? ORDER BY turns.request_date DESC", (approved == "true"));
        return rows;
	} catch (error) {
		throw error;
	}
};

turns.getTurnsUser = async (dni) => {
    try {
        const [rows] = await pool.query("SELECT turns.*, users.name, users.surname FROM turns LEFT JOIN users ON turns.instructor_dni = users.dni WHERE turns.user_dni = ? ORDER BY turns.start_date DESC", [dni]);
        return rows;
    } catch (error) {
        throw error;
    }
}

turns.setResult = async (id, result) => {
    try {
        const [dbRes] = await pool.query(
			"UPDATE turns SET approved = ? WHERE id = ?",
			[(result == 'true'), id],
		);
        return dbRes;
    } catch (error) {
        throw error;
    }
}

turns.reserveTurn = async (user_dni, startDate, endDate, airplane, instructor, purpose) => {
    try {
        const [dbRes] = await pool.query("INSERT INTO turns VALUE (NULL, NOW(), ?, ?, ?, ?, ?, ?, NULL);", [user_dni, startDate, endDate, airplane, purpose, instructor]);
        return dbRes;
    } catch (error) {
        throw error;
    }
}

export default turns;
