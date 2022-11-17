// Data Base
import { pool } from "../db.js";

// Get news
export const getNews = async (req, res) => {
	const { x0, n } = req.query;

	try {
		const [rows] = await pool.query(
			"SELECT * FROM news ORDER BY date DESC LIMIT ?,?",
			[parseInt(x0), parseInt(n)],
		);
		res.json(rows);
	} catch (e) {
		return res.status(500).json({
			message: "Something went wrong",
			error: e,
		});
	}
};

// Create news
export const createNews = async (req, res) => {
	const { date, title, description, img } = req.body;

	if (date == null || title == null || description == null || img == null) {
		res.status(400).json({
			message: "Some data is null",
		});
	} else {
		try {
			await pool.query(
				"INSERT INTO news (date, title, description, img) VALUES (?,?,?,?)",
				[date, title, description, img],
			);
			res.send("Post Success");
		} catch (e) {
			return res.status(500).json({
				message: "Something went wrong",
				error: e,
			});
		}
	}
};

// Update news
export const updateNews = async (req, res) => {
	const { id } = req.params;
	const { date, title, description, img } = req.body;

	try {
		const [dbRes] = await pool.query(
			"UPDATE news SET date = IFNULL(?, date), title = IFNULL(?, title), description = IFNULL(?, description), img = IFNULL(?, img) WHERE id = ?",
			[date, title, description, img, id],
		);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "New not found",
			});
		} else {
			res.json((await pool.query("SELECT * FROM news WHERE id = ?", [id]))[0]);
		}
	} catch (e) {
		return res.status(500).json({
			message: "Something went wrong",
			error: e,
		});
	}
};

// Delete news
export const deleteNews = async (req, res) => {
	const { id } = req.params;

	try {
		const [dbRes] = await pool.query("DELETE FROM news WHERE id=?", [id]);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "New not found",
			});
		} else {
			res.send("News Deleted");
		}
	} catch (e) {
		return res.status(500).json({
			message: "Something went wrong",
			error: e,
		});
	}
};
