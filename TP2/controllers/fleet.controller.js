// Data Base
import {pool} from '../db.js'

// Get Fleet, returns the fleet from x position and an 'n' ammount of airplanes
export const getFleet = async (req, res) => {
    let {x0, n} = req.query;
    const [rows] = await pool.query('SELECT * FROM fleet LIMIT ?,?', [parseInt(x0),parseInt(n)]);
    res.json(rows);
}

// Get Airplane, returns just one airplane by plate
export const getAirplane = async (req, res) => {
    const [ airplane ] = await pool.query('SELECT * FROM fleet WHERE plate = ?', [req.params.plate]);

    if(airplane.length === 0){
        res.status(400).json({
            message: "Airplane not found"
        })
    }else{
        res.json(airplane[0]);
    }
}

// Create Airplane, creates an airplane on the db
export const createAirplane = async (req, res) => {
    try{
        let { plate, name, engine, brand, model, speed, consumption, img} = req.body;
        await pool.query('INSERT INTO fleet (plate, name, engine, brand, model, speed, consumption, img) VALUES (?,?,?,?,?,?,?,?)', [plate, name, engine, brand, model, speed, consumption, img])
        res.send('Post Success')
    } catch(e){
        if(e.code = "ER_DUP_ENTRY"){
            return res.status(500).json({
                message: "Error, Duplicated Plate"
            })
        }else{
            return res.status(500).json({
                message: "Error"
            })
        }
        
    }
    
}

// Update Airplane, modifies the info of an existing airplane
export const updateAirplane = async (req, res) => {
    const { plate } = req.params;
    const { name, engine, brand, model, speed, consumption, img } = req.body;
    const [ dbRes ] = await pool.query('UPDATE fleet SET name = IFNULL(?, name), engine = IFNULL(?, engine), brand = IFNULL(?, brand), model = IFNULL(?, model), speed = IFNULL(?, speed), consumption = IFNULL(?, consumption), img = IFNULL(?, img) WHERE plate = ?', [ name, engine, brand, model, speed, consumption, img, plate ]);
    
    if(dbRes.affectedRows === 0){
        return res.status(404).json({
            message: "Airplane not found"
        })
    } else{
        res.json((await pool.query('SELECT * FROM fleet WHERE plate = ?', [plate]))[0]);
    }
}

// Delete Airplane, deletes a given plate airplane from de db
export const deleteAirplane = async (req, res) => {
    const { id } = req.params;
    const [ dbRes ] = await pool.query('DELETE FROM news WHERE id=?',[id]);

    if(dbRes.affectedRows === 0){ return res.status(404).json({
        message: "Airplane not found"
    })}else{
        res.send("News Deleted");
    }
}