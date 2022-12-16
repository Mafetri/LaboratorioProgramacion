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
			if(result == "true"){
				await auditlog.createLog(req.user.dni, "approved", "turns", id);
			} else {
				await auditlog.createLog(req.user.dni, "rejected", "turns", id);
			}
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
		if(req.user.role == "admin" && purpose == "workshop" || purpose == "baptism"){
			// Gets the turns that overlaps the workshop or baptismrange and delete it
			const turnsOverlaped = await turns.getTurnsOverlaped(airplane, startDate, endDate);
			for( let i = 0; i < turnsOverlaped.length; i++){
				await turns.deleteTurn(turnsOverlaped[i].id);
			}

			const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, null, purpose, true);
			res.send("success");
		} else {
			if(req.user.enabled == true){
				const acceptedTurns = await turns.getTurns("true");
				let instructorDni = 0;
		
				if(instructor == true) {
					// instructorsAvailable has all the instructors avialable
					let instructorsAvailable = await instructors.getInstructorsAvailable(startDate, endDate);
	
					if( instructorsAvailable.length > 0 ){
						// instructorsOrdered has all instructors ordered by ammount of turns
						const instructorsOrdered = await instructors.orderByAmountOfTurns();
	
						// instructorDni now has the first instructorOrdered that appears on the available ones
						for(let i = 0; i < instructorsOrdered.length; i++){
							for(let j = 0; j < instructorsAvailable.length; j++){
								if(instructorsAvailable[j].instructor_dni == instructorsOrdered[i].instructor_dni){
									instructorDni = instructorsOrdered[i].instructor_dni;
									break;
								}
							}
						}
					}
				}
		
				// If an airplane was requested
				if( airplane != undefined ) {
					// Gets the turns that has the same airplane that overlaps the requested turn
					const turnsOverlaped = await turns.getTurnsOverlaped(airplane, startDate, endDate);
		
					// If there is no airplane turn overlaps
					if(turnsOverlaped.length == 0 && instructor == false){
						const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, null, purpose);
						res.send("success");
					} else if (turnsOverlaped.length == 0 && instructor == true){
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
