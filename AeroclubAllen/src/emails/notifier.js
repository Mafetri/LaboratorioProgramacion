import users from "../components/users/users.dao.js";
import turns from "../components/turns/turns.dao.js";
import { turnReservedEmail, canceledTurnEmail, canceledTurnOverlappedEmail, sendWelcomeEmail, disabledUserEmail } from "./email.js";
import { LOCAL_TIME } from "../config.js";

let notifier = {};

// Turn Reserved Email
// Renders the reserved turn email template and sends it to the given email
notifier.turnReserved = async (userName, email, startDate, endDate, airplane_plate, instructorDni, purpose, approved) => {  
    try {
        let instructorName = null;
        if(instructorDni != null){
            instructorName = await users.getUser(instructorDni).name;
        }

        turnReservedEmail(userName, email, getDate(startDate), getDate(endDate), airplane_plate, instructorName, purpose, approved);
    } catch (error) {
        console.log(error);
    }
}

// notifier.turnRevised = async (id) => {
//     try {
//         // Sends email to the user of the turn
//         const turnRevised = await turns.getTurn(id);
//         const user = (await users.getUser(turnRevised.user_dni))[0];
//         let instructor = null;
//         if(turnRevised.instructor_dni != null){
//             instructor = await users.getUser(turnRevised.instructor_dni);
//             turnReservedEmail(user.name, user.email, getDate(turnRevised.start_date), getDate(turnRevised.end_date), turnRevised.airplane_plate, instructor.name + " " + instructor.surname, turnRevised.purpose, turnRevised.approved);
//         } else {
//             turnReservedEmail(user.name, user.email, getDate(turnRevised.start_date), getDate(turnRevised.end_date), turnRevised.airplane_plate, null, turnRevised.purpose, turnRevised.approved);
//         }
//     } catch (error) {
//         console.log(error);
//     }
    
// }

// Canceled Turn by Admin or Secretary
notifier.canceledTurn = async (turn, userName) => {
    try {
        const userTurn = (await users.getUser(turn.user_dni))[0];
        canceledTurnEmail(userTurn.name, userTurn.email, userName, getDate(turn.start_date), getDate(turn.end_date), turn.airplane_plate);
    } catch (error) {
        console.log(error);
    }
}

// Canceled Turn By Other Turn
// Call email to render the canceled turn email template and sends it to the given email
notifier.canceledTurnsOverlapped = async (turnsOverlaped, startDate, endDate, reason) => {
    try {
        turnsOverlaped.forEach(async(turn) => {
            const user = (await users.getUser(turn.user_dni))[0];
        
            canceledTurnOverlappedEmail(user.name, user.email, getDate(startDate), getDate(endDate), getDate(turn.start_date), getDate(turn.end_date), turn.airplane_plate, reason);
        })
    } catch (error) {
        console.log(error);
    }
}

// // Send Welcome Email
// // Renders the welcome email template and sends it to the given email
// export const sendWelcomeEmail = (name, surname, email, phone, role, dni) => {
//     ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/welcome.ejs"), {name, surname, email, phone, role, dni}, (err, data) => {
//         if(err){
//             console.log(err);
//         } else {
//             sendEmail('avisos@aerocluballen.com.ar', email, 'Bienvenido al Aeroclub de Allen', data);
//         };
//     })
// }

// // Send Disabled User Email
// export const disabledUserEmail = (name, userName, email, enabled) => {
//     ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/disabledUser.ejs"), {name, userName, enabled}, (err, data) => {
//         if(err){
//             console.log(err);
//         } else {
//             sendEmail('avisos@aerocluballen.com.ar', email, 'Cuenta ' + (enabled ? "Habilitada" : "Deshabilitada"), data);
//         };
//     })
// }

// Get Date
// Returns a string formed by a date on isostring into a string of hour and localdate
function getDate(date) {
    date = new Date(date).toISOString();
    let day = date.split("T")[0].split("-");
    day = day[2] + "/" + day[1] + "/" + day[0];
    let hour = date.split("T")[1].split(":");

    hour = ((parseInt(hour[0]) + parseInt(LOCAL_TIME)) % 24 + 24) % 24 + ":" + hour[1] + "hs hora local (UTC-3)";

    return hour + " del día " + day;
}

export default notifier;