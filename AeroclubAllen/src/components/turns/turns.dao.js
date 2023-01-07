import { pool } from "../../db.js";

const turns = {};

turns.getTurns = async (approved) => {
	try {
        // If approved is undefined, it searchs the turns that hasn't been revised yet
        if(approved == "unchecked") {
            const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns LEFT JOIN users u ON turns.user_dni = u.dni LEFT JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved IS NULL ORDER BY turns.request_date DESC");
            return rows;
        } else if (approved == "true"){
            // If approved is true, then it returns the approved turns, else, it returns the false ones
            const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns LEFT JOIN users u ON turns.user_dni = u.dni LEFT JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved = 1 ORDER BY turns.start_date ASC");
            return rows;
        }

        // If approved is undefined, then it returns the approved turns and the unchecked turns
        const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns LEFT JOIN users u ON turns.user_dni = u.dni LEFT JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved = 1 OR turns.approved IS NULL ORDER BY turns.start_date ASC");
        return rows;
	} catch (error) {
		throw error;
	}
};

turns.getTurn = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM turns WHERE id = ?", [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

turns.getTurnsUser = async (dni) => {
    try {
        const [rows] = await pool.query("SELECT turns.*, users.name, users.surname FROM turns LEFT JOIN users ON turns.instructor_dni = users.dni WHERE turns.user_dni = ? AND purpose <> 'workshop' AND purpose <> 'baptism' ORDER BY turns.start_date ASC", [dni]);
        return rows;
    } catch (error) {
        throw error;
    }
}

turns.getTurnsOverlaped = async (plate, startDate, endDate) => {
    try {
        const [rows] = await pool.query("SELECT * FROM turns WHERE turns.airplane_plate = ? AND ? < turns.end_date AND ? > turns.start_date AND (turns.approved = 1 OR turns.approved IS NULL)", [plate, startDate, endDate]);
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

turns.reserveTurn = async (user_dni, startDate, endDate, airplane, instructor, purpose, approved) => {
    try {
        const [dbRes] = await pool.query("INSERT INTO turns VALUES (NULL, NOW(), ?, ?, ?, ?, ?, ?, ?);", [user_dni, startDate, endDate, airplane, purpose, instructor, approved]);
        return dbRes;
    } catch (error) {
        throw error;
    }
}

turns.deleteTurn = async (id) => {
    try {
        const [dbRes] = await pool.query("DELETE FROM turns WHERE id = ?", [id]);
        return dbRes;
    } catch (error) {
        throw error;
    }
}

export default turns;
