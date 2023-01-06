import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false
})

export const turnReservedEmail = (userName, userEmail, startDate, endDate, airplane_plate, instructor, purpose, approved) => {
    let startDay = startDate.split("T")[0].split("-");
    startDay = startDay[2] + "/" + startDay[1] + "/" + startDay[0];
	let startHour = startDate.split("T")[1].split(":");
    startHour = startHour[0] + ":" + startHour[1] + "hs hora local (UTC-3)";
    
    let endDay = endDate.split("T")[0].split("-");
    endDay = endDay[2] + "/" + endDay[1] + "/" + endDay[0];
	let endHour = endDate.split("T")[1].split(":");
    endHour = endHour[0] + ":" + endHour[1] + "hs hora local (UTC-3)";
    
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/reservedTurn.ejs"), {userName, startDay, startHour, endDay, endHour, airplane_plate, instructor, purpose, approved}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            transporter.sendMail({
                from: 'avisos@aerocluballen.com.ar',
                to: userEmail,
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

export const canceledTurnEmail = (user, turnCanceleed, turn_start_date, turn_end_date, reason, res) => {
    const { name } = user;
    const { start_date, airplane_plate } = turnCanceleed;

    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/reservedTurn.ejs"), {name: user.name, surname: user.surname, email: user.email, phone: user.phone, role: user.role}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            transporter.sendMail({
                from: 'avisos@aerocluballen.com.ar',
                to: 'jose@hotmail.com',
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
    res.render('email-templates/canceledTurn.ejs', {name, turn_start_date, turn_end_date, start_date, airplane_plate, reason});
}


export const sendWelcomeEmail = (name, surname, email, phone, role, dni) => {
    ejs.renderFile(path.join(fileURLToPath(import.meta.url),"../../views/email-templates/welcome.ejs"), {name, surname, email, phone, role, dni}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            transporter.sendMail({
                from: 'avisos@aerocluballen.com.ar',
                to: 'jose@hotmail.com',
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