// Data Base
import {pool} from '../db.js'

// Get news
export const getNews = async (req, res) => {
    let {x0, n} = req.query;
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC LIMIT ?,?', [parseInt(x0),parseInt(n)]);
    res.json(rows);
}

// Create news
export const createNew = (req, res) => {
    res.send('POST crear noticia')
};

// Update news
export const updateNew = (req, res) => {
    const { id, name, description } = req.body;
    res.send(`Name ${id} ${name}, desc ${description}`);
};

// Delete news
export const deleteNew = (req, res) => {
    const { id } = req.params;
    res.send(`Delete record with id ${id}`);
};
