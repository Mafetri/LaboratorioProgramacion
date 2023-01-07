import turns from "./turns.dao.js";
import users from "../users/users.dao.js";
import { somethingWentWrong500 } from "../../error/error.handler.js";
import auditlog from "../auditlog/auditlog.dao.js";
import instructors from "../instructors/instructors.dao.js";
import { canceledTurnEmail, turnReservedEmail } from "../../emails/email.js";

// Get Turns
export const getTurns = async (req, res) => {
	const { approved, future } = req.query;
	let rows;
	try {
		if(future == "true"){
			rows = await turns.getFutureTurns(approved);
		} else {
			rows = await turns.getTurns(approved);
		}
		res.json(rows);
	} catch (e) {
		somethingWentWrong500(e, res);
	}
};

export const getTurnsUser = async (req, res) => {
	const { dni, future } = req.params;
	try {
		let rows;
		if(future == "true"){
			rows = await turns.getFutureTurnsUser(dni);
		} else {
			rows = await turns.getTurnsUser(dni);
		}
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
			// Sends email to the user of the turn
			const turnRevised = await turns.getTurn(id);
			const user = (await users.getUser(turnRevised.user_dni))[0];
			let instructor = null;
			if(turnRevised.instructor_dni != null){
				instructor = await users.getUser(turnRevised.instructor_dni);
				turnReservedEmail(user.name, user.email, turnRevised.start_date, turnRevised.end_date, turnRevised.airplane_plate, instructor.name + " " + instructor.surname, turnRevised.purpose, turnRevised.approved);
			} else {
				turnReservedEmail(user.name, user.email, turnRevised.start_date, turnRevised.end_date, turnRevised.airplane_plate, null, turnRevised.purpose, turnRevised.approved);
			}

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
				// Gets the affected user and sends him an email
				let userTurnOvelaped = (await users.getUser(turnsOverlaped[i].user_dni))[0];
				canceledTurnEmail(userTurnOvelaped.name, userTurnOvelaped.email, startDate, endDate, turnsOverlaped[i].start_date, turnsOverlaped[i].end_date, airplane, purpose);
				
				await turns.deleteTurn(turnsOverlaped[i].id);
			}

			const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, null, purpose, true);
			res.send("success");
		} else {
			if(req.user.enabled == true){
				const acceptedTurns = await turns.getTurns("true");
				let instructorDni = 0;
				let approved = null;

				if((new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000 / 60 / 60 < 1.5){
					approved = true;
				}
		
				if(instructor == true) {
					// instructorsAvailableOrdered has all the instructors avialable (that doesnt have a turn, that is not rejected
					// assigned that overlaps and in the lapse of time requested he has loaded that he is available) ordered by the amount of turns assigned
					let instructorsAvailableOrdered = await instructors.getInstructorsAvailableOrdered(startDate, endDate);
	
					if( instructorsAvailableOrdered.length > 0 ){
						instructorDni = instructorsAvailableOrdered[0].instructor_dni;
					}
				}
		
				// If an airplane was requested
				if( airplane != undefined ) {
					// Gets the turns that has the same airplane that overlaps the requested turn
					const turnsOverlaped = await turns.getTurnsOverlaped(airplane, startDate, endDate);
		
					// If there is no airplane turn overlaps
					if(turnsOverlaped.length == 0 && instructor == false){
						const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, null, purpose, approved);
						turnReservedEmail(req.user.name, req.user.email, startDate, endDate, airplane, null, purpose, approved);
						res.send("success");
					} else if (turnsOverlaped.length == 0 && instructor == true){
						if(instructorDni != 0){
							const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, instructorDni, purpose, approved);
							const instructorName = await users.getUser(instructorDni).name;
							turnReservedEmail(req.user.name, req.user.email, startDate, endDate, airplane, instructorName, purpose, approved);
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
						const dbRes = await turns.reserveTurn(req.user.dni, startDate, endDate, airplane, instructorDni, purpose, approved);
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
