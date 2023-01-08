import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { LOCAL_TIME } from "../config.js";

let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false
})

// Turn Reserved Email
// Renders the reserved turn email template and sends it to the given email
export const turnReservedEmail = (userName, email, startDate, endDate, airplane_plate, instructor, purpose, approved) => {  
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/reservedTurn.ejs"), {userName, startDate: getDate(startDate), endDate: getDate(endDate), airplane_plate, instructor, purpose, approved}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            sendEmail('avisos@aerocluballen.com.ar', email, approved == null ? 'Turno Reservado sin confirmar' : 'Turno Confirmado', data);
        };
    })
}

// Canceled Turn by Admin or Secretary
export const canceledTurnEmail = (name, email, userName, turnStartDate, turnEndDate, airplane) => {
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/canceledTurn.ejs"), {name, turnStartDate: getDate(turnStartDate), turnEndDate: getDate(turnEndDate), userName, airplane}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            sendEmail('avisos@aerocluballen.com.ar', email, 'Turno Cancelado', data);
        };
    })
}

// Canceled Turn By Other Turn
// Renders the canceled turn email template and sends it to the given email
export const canceledTurnOverlappedEmail = (name, email, newTurnStartDate, newTurnEndDate, turnStartDate, turnEndDate, airplane, reason) => {
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/overlappedTurn.ejs"), {name, turnStartDate: getDate(turnStartDate), turnEndDate: getDate(turnEndDate), newTurnStartDate: getDate(newTurnStartDate), newTurnEndDate: getDate(newTurnEndDate), airplane, reason}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            sendEmail('avisos@aerocluballen.com.ar', email, 'Turno Cancelado', data);
        };
    })
}

// Send Welcome Email
// Renders the welcome email template and sends it to the given email
export const sendWelcomeEmail = (name, surname, email, phone, role, dni) => {
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/welcome.ejs"), {name, surname, email, phone, role, dni}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            sendEmail('avisos@aerocluballen.com.ar', email, 'Bienvenido al Aeroclub de Allen', data);
        };
    })
}

// Send Disabled User Email
export const disabledUserEmail = (name, userName, email, enabled) => {
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/disabledUser.ejs"), {name, userName, enabled}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            sendEmail('avisos@aerocluballen.com.ar', email, 'Cuenta ' + (enabled ? "Habilitada" : "Deshabilitada"), data);
        };
    })
}

// Send Email
// Sends an email from a email given, to the given email with the given subject and data
function sendEmail(fromEmail, toEmail, subject, data) {
    transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: subject,
        html: data
    }, function(error, info){
        if(error) {
            console.log(error);
        }
    });
}

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