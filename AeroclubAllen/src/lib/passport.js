import passport from "passport";
import LocalStrategy from "passport-local";
import { pool } from "../db.js";
import helpers from "./helpers.js";
import notifier from "../emails/notifier.js";

passport.use('local.signup',
	new LocalStrategy.Strategy(
		{
			usernameField: "dni",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, dni, password, done) => {
			const { name, surname, email, phone } = req.body;

            try{
				const [ existingUser ] = await pool.query("SELECT * FROM users WHERE dni = ?", dni)

				// If the user exists on the DB and has the default password "newuser", it puts the values of the form
				if(existingUser.length > 0 && existingUser[0].password == "newuser"){
					// Saves on password the encrypted password
					password = await helpers.encryptPassword(password);

					// Saves on DB
					await pool.query("UPDATE users SET name = ?, surname = ?, email = ?, password = ?, phone = ? WHERE dni = ?", [ name, surname, email, password, phone, dni]);

					// Sends a notification to the new user
					notifier.welcome(name, surname, email, phone, existingUser[0].role, existingUser[0].dni);
					
					return done(null, {dni, name, surname, phone, email, password});
				} else {
					done(null, false, req.flash("message", "Usuario no existente"));
				}
            } catch(e){
                console.log(e);
            }
            
		}
	),
);


passport.use(
	"local.signin",
	new LocalStrategy.Strategy(
		{
			usernameField: "dni",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, dni, password, done) => {
			const [rows] = await pool.query("SELECT * FROM users WHERE dni = ?", [
				dni,
			]);
			if (rows.length > 0 && rows[0].password != "newuser") {
				const user = rows[0];
				const validPassword = await helpers.matchPassword(
					password,
					user.password,
				);
				if (validPassword) {
					done(null, user, req.flash("success", "Welcome " + user.dni));
				} else {
					done(null, false, req.flash("message", "Incorrect Password"));
				}
			} else {
				return done(
					null,
					false,
					req.flash("message", "The Username does not exists."),
				);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.dni);
});

passport.deserializeUser(async (dni, done) => {
	const [rows] = await pool.query("SELECT * FROM users WHERE dni = ?", [dni]);
	done(null, rows[0]);
});

export default passport;