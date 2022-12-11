import { somethingWentWrong500 } from "../../error/error.handler.js";
import instructors from "./instructors.dao.js";

// Get Instructos Aviability
export const getInstructosAviability = async (req, res) => {
    try {
        const rows = instructors.getInstructorsAviability();
        res.json(rows);
    } catch (error) {
        somethingWentWrong500(e, res);
    }
}