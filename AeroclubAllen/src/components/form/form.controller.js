// Data Base
import { pool } from "../../db.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";

export const getForms = async (req, res) => {
    try {
        [ rows ] = await pool.query('SELECT * FROM forms');
        res.json(rows);
    } catch (error) {
        somethingWentWrong500(e, res);
    }
}

export const submitForm = async (req, res) => {
    const { name, phone, email, message } = req.body;

    if (name == "" || phone == "" || email == "" || message == "") {
        res.send("error");
    } else {
        try {
            await pool.query(
                "INSERT INTO forms (name, phone, email, message) VALUES (?,?,?,?)",
                [ name, phone, email, message ],
            );
            res.send("success");
        } catch (e) {
            somethingWentWrong500(e, res);
        }
    }
}