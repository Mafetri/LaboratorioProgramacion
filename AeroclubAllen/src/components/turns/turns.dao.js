import { pool } from "../../db.js";

const turns = {};

turns.getTurns = async (approved) => {
	try {
        // If approved is undefined, it searchs the turns that hasn't been revised yet
        if(approved == "unchecked") {
            const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns JOIN users u ON turns.user_dni = u.dni JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved IS NULL ORDER BY turns.request_date DESC");
            return rows;
        }

        // If approved is true, then it returns the approved turns, else, it returns the false ones
        const [rows] = await pool.query("SELECT turns.*, u.name AS requester_name, u.surname AS requester_surname, i.name AS instructor_name, i.surname AS instructor_surname FROM turns JOIN users u ON turns.user_dni = u.dni JOIN users i ON turns.instructor_dni = i.dni WHERE turns.approved = ? ORDER BY turns.request_date DESC", (approved == "true"));
        return rows;
	} catch (error) {
		throw error;
	}
};

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

export default turns;