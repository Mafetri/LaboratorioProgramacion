// Data Base
import {pool} from '../db.js'

// Get news
export const getNews = async (req, res) => {
    let {x0, n} = req.query;
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC LIMIT ?,?', [parseInt(x0),parseInt(n)]);
    res.json(rows);
}

// Create news
export const createNews = async (req, res) => {
    let { date, title, description, img } = req.body;
    await pool.query('INSERT INTO news (date, title, description, img) VALUES (?,?,?,?)', [date, title, description, img])
    res.send('Post Success')
};

// Update news
export const updateNews = async (req, res) => {
    const { id } = req.params;
    const { date, title, description, img } = req.body;
    const [ dbRes ] = await pool.query('UPDATE news SET date = IFNULL(?, date), title = IFNULL(?, title), description = IFNULL(?, description), img = IFNULL(?, img) WHERE id = ?', [date, title, description, img, id]);
    
    if(dbRes.affectedRows === 0) return res.status(404).json({
        message: "New not found"
    })
    
    res.json((await pool.query('SELECT * FROM news WHERE id = ?', [id]))[0]);
};

// Delete news
export const deleteNews = async (req, res) => {
    const { id } = req.params;
    const [ dbRes ] = await pool.query('DELETE FROM news WHERE id=?',[id]);

    if(dbRes.affectedRows === 0){
        return res.status(404).json({
            message: "New not found"
        })
    }else{
        res.send("News Deleted");
    }
};
