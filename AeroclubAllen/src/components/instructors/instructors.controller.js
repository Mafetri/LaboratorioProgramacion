import { somethingWentWrong500 } from "../../error/error.handler.js";
import instructors from "./instructors.dao.js";

// Get Instructors Aviability
export const getInstructorsAviability = async (req, res) => {
    const {future} = req.query;
    try {
        let rows;
        if (future == "true") {
            rows = await instructors.getFutureInstructorsAviability();
        } else {
            rows = await instructors.getInstructorsAviability();
        }
        res.json(rows);
    } catch (error) {
        somethingWentWrong500(error, res);
    }
}

// Get Instructor Aviability
export const getInstructorAviability = async (req, res) => {
    const { dni } = req.params;
    const { future } = req.query;

    try {
        let rows;
        if(future == "true"){
            rows = await instructors.getFutureInstructorAviability(dni);
        } else {
            rows = await instructors.getInstructorAviability(dni);
        }
        res.json(rows);
    } catch (error) {
        somethingWentWrong500(error, res);
    }
}

export const addAviability = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        const rows = await instructors.addAviability (startDate, endDate, req.user.dni);
        res.send("success");
    } catch (e) {
        throw e;
    }
}