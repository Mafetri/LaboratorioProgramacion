// Data Base
import { pool } from "../db.js";

export const getForms = async (req, res) => {
    try {
        [ rows ] = await pool.query('SELECT * FROM forms');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: e,
        });
    }
}

export const submitForm = async (req, res) => {
    const { name, phone, email, message } = req.body;

    try {
        await pool.query(
			"INSERT INTO forms (name, phone, email, message) VALUES (?,?,?,?)",
			[ name, phone, email, message ],
		);
        alert("hola");
    } catch (e) {
        return res.status(500).json({
            message: "Something went wrong",
            error: e,
        });
    }
}