import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false
})

export const turnReservedEmail = (userName, email, startDate, endDate, airplane_plate, instructor, purpose, approved) => {    
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/reservedTurn.ejs"), {userName, startDate: getDate(startDate), endDate: getDate(endDate), airplane_plate, instructor, purpose, approved}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            transporter.sendMail({
                from: 'avisos@aerocluballen.com.ar',
                to: email,
                subject: 'Turno reservado con exito',
                html: data
            }, function(error, info){
                if(error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        };
    })
}

export const canceledTurnEmail = (name, email, newTurnStartDate, newTurnEndDate, turnStartDate, turnEndDate, airplane, reason) => {
    console.log(name, email, newTurnStartDate, newTurnEndDate, turnStartDate, turnEndDate, airplane, reason);
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/canceledTurn.ejs"), {name, turnStartDate: getDate(turnStartDate.toISOString(), true), turnEndDate: getDate(turnEndDate.toISOString(), true), newTurnStartDate: getDate(newTurnStartDate), newTurnEndDate: getDate(newTurnEndDate), airplane, reason}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            transporter.sendMail({
                from: 'avisos@aerocluballen.com.ar',
                to: email,
                subject: 'Cancelación de Turno',
                html: data
            }, function(error, info){
                if(error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        };
    })
}


export const sendWelcomeEmail = (name, surname, email, phone, role, dni) => {
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/welcome.ejs"), {name, surname, email, phone, role, dni}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            transporter.sendMail({
                from: 'avisos@aerocluballen.com.ar',
                to: email,
                subject: 'Bienvenido a Aeroclub Allen',
                html: data
            }, function(error, info){
                if(error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        };
    })
}

function getDate(date, utc) {
    let day = date.split("T")[0].split("-");
    day = day[2] + "/" + day[1] + "/" + day[0];
    let hour = date.split("T")[1].split(":");
    if(utc){
        hour = hour[0] - 3 + ":" + hour[1] + "hs hora local (UTC-3)";
    } else {
        hour = hour[0] + ":" + hour[1] + "hs hora local (UTC-3)";
    }
    return hour + " del día " + day;
}