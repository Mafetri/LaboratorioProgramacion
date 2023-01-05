const ejs = require('ejs');


export const sendWelcomeEmail = (user) => {
    const {name, surname, email, phone} = user;
    ejs.renderFile('./templates/welcome.ejs', {name, surname, email, phone}, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            return data;
        }
    })

}   