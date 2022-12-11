import { somethingWentWrong500 } from "../../error/error.handler.js";
import instructors from "./instructors.dao.js";

// Get Instructors Aviability
export const getInstructorsAviability = async (req, res) => {
    try {
        const rows = await instructors.getInstructorsAviability();
        res.json(rows);
    } catch (error) {
        somethingWentWrong500(error, res);
    }
}

// Get Instructor Aviability
export const getInstructorAviability = async (req, res) => {
    const { dni } = req.params;

    try {
        const rows = await instructors.getInstructorAviability(dni);
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