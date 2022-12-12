import turns from "./turns.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";
import instructors from "../instructors/instructors.dao.js";

// Get Turns
export const getTurns = async (req, res) => {
	const { approved } = req.query;
	try {
		const rows = await turns.getTurns(approved);
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

export const getTurnsUser = async (req, res) => {
	const { dni } = req.params;

	try {
		const rows = await turns.getTurnsUser(dni);
		res.json(rows);
	} catch (error) {
		somethingWentWrong500(error, res);
	}
}

// Set Status
export const setStatus = async (req, res) => {
	const { id } = req.params;
	const { result } = req.query;

	try {
		const dbRes = await turns.setResult(id, result);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Turn not found",
			});
		} else {
			await auditlog.createLog(req.user.dni, "approved", "turns", id);
			res.send("success");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

// Reserve Turn
export const createTurn = async (req, res) => {
	const { startDate, endDate, airplane, instructor, purpose } = req.body;
	let responseText = "";
	try {
		if(req.user.enabled == true){
			const acceptedTurns = await turns.getTurns("true");
			let instructorDni = 0;
	
			if(instructor == true) {
				const instructorsAviability = await instructors.getInstructorsAviability();
				let instructorsAvailable = [];
	
				// Checks if there is any instructor that has empty time for the time of the turn requested
				instructorsAviability.forEach((i) => {
					// If the requested time is "inside" the availability of any instructor
					if(new Date(i.start_date).getTime() < new Date(startDate).getTime() && new Date(i.end_date).getTime() > new Date(endDate).getTime()){
						// Gets all the turns assigned to that instructor
						let turnsOfThatInstructor = acceptedTurns.filter((t) => {t.instructor_dni == i.instructor_dni});
	
						// Gets the turns that overlaps with the requested one
						let turnsThatOverlap = turnsOfThatInstructor.filter((t) => {timesOverLap(startDate, endDate, t.start_date, t.end_date)})
	
						// If no turns of the instructor, that has aviability time for the desiered lap, overlaps then is is assigned
						if(turnsThatOverlap.length == 0){
							instructorsAvailable.push({dni: i.instructor_dni, turnsReservedWithHim: turnsOfThatInstructor.length});
						}
					}
				})
	
				if(instructorsAvailable.length > 0){
					// Get the instructor that has the lowest ammount of turnsReservedWithHim
					instructorDni = (instructorsAvailable.reduce((min, inst) => (inst.turnsReservedWithHim < min.turnsReservedWithHim ? inst : min), { turnsReservedWithHim: Infinity })).dni;
				}
			}
	
			// If an airplane was requested
			if( airplane != undefined ) {
				// Gets the turns that has the same airplane that overlaps the requested turn
				const turnsThatOverlaps = acceptedTurns.filter((t)=>{timesOverLap(startDate, endDate, t.start_date, t.end_date) && t.airplane_plate == airplane});
	
				// If there is no airplane turn overlaps
				if(turnsThatOverlaps.length == 0 && instructor == false){
					const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, null, purpose);
					res.send("success");
				} else if (turnsThatOverlaps.length == 0 && instructor == true){
					if(instructorDni != 0){
						const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, instructorDni, purpose);
						res.send("success");
					} else {
						res.send("no-instructor");
					}
				} else {
					res.send("airplane-overlaps");
				}

			} else {
				// If no airplane were requested, we are talking about an student
				if(instructorDni == 0) {
					res.send("no-instructor");
				} else {
					const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, instructorDni, purpose);
					res.send("success");
				}
			}
		} else {
			res.send("user-disabled");
		}
	} catch (e) {
		console.log(e);
		somethingWentWrong500(e, res);
	}
};

// Delete Turn
export const deleteTurn = async (req, res) => {
	const { id } = req.params;

	try {
		const dbRes = await turns.deleteTurn(id);

		if (dbRes.affectedRows === 0) {
			return res.status(404).json({
				message: "Turn not found",
			});
		} else {
			res.send("success");
		}
	} catch (e) {
		somethingWentWrong500(e, res);
	}
}

const timesOverLap = (startDate, endDate, acceptedStartDate, acceptedEndDate) => {
	const startDateTime = new Date(startDate).getTime();
	const endDateTime = new Date(endDate).getTime();

	const acceptedStartDateTime = new Date(acceptedStartDate).getTime();
	const acceptedEndDateTime = new Date(acceptedEndDate).getTime();

	if (startDateTime < acceptedEndDateTime && acceptedStartDateTime < endDateTime) {
		return true;
	}

	return false;
}
