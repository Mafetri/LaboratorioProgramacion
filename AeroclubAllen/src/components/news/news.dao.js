import { pool } from "../../db.js";

const news = {};

// Get News
news.getNews = async (x0, n) => {
	try {
		const [rows] = await pool.query("SELECT * FROM news ORDER BY date DESC LIMIT ?,?", [parseInt(x0), parseInt(n)]);
		return rows;
	} catch (error) {
		throw error;
	}
};

// Create news
news.createNews = async (date, title, description, imgRoute) => {
	try {
		const [rows] = await pool.query("INSERT INTO news (date, title, description, img) VALUES (?,?,?,?);", [
			date,
			title,
			description,
			imgRoute,
		]);
		return rows;
	} catch (error) {
		throw error;
	}
};

// Get Last ID
news.getLastId = async () =>{
    try {
        const [rows] = await pool.query("SELECT id FROM news ORDER BY id DESC LIMIT 1");
        return rows;
    } catch (error) {
        throw error;
    }
}

// Update News
news.updateNews = async (date, title, description, imgRoute, id) => {
	try {
		const [rows] = await pool.query(
			"UPDATE news SET date = IFNULL(?, date), title = IFNULL(?, title), description = IFNULL(?, description), img = IFNULL(?, img) WHERE id = ?",
			[date, title, description, imgRoute, id],
		);
		return rows;
	} catch (error) {
		throw error;
	}
};

// Get News by ID
news.getNewsId = async (id) =>{
    try {
        const [rows] = await pool.query("SELECT * FROM news WHERE id = ?", [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Delete News
news.deleteNews = async (id)=> {
    try {
        const [rows] = await pool.query("DELETE FROM news WHERE id=?", [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export default news;
