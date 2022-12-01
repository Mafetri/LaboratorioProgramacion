import passport from "passport";
import LocalStrategy from "passport-local";
import { pool } from "../db.js";
import helpers from "./helpers.js";

passport.use('local.signup',
	new LocalStrategy.Strategy(
		{
			usernameField: 'dni',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, dni, password, done) => {
			const { name, surname, email } = req.body;

            try{
                // Saves on password the encrypted password
                password = await helpers.encryptPassword(password);
                            
                // Saves on DB
                const result = await pool.query("INSERT INTO users VALUES (?,?,?,?,?,?) ", [dni, name, surname, email, 'NULL', password]);

                return done(null, {dni, name, surname, email, password});
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
			const rows = await pool.query("SELECT * FROM users WHERE dni = ?", [
				dni,
			]);
			if (rows.length > 0) {
				const user = rows[0][0];
				const validPassword = await helpers.matchPassword(
					password,
					user.password,
				);
				if (validPassword) {
					done(null, user, req.flash("success", "Welcome " + user.dni));
				} else {
					console.log("no entró");
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
	const rows = await pool.query("SELECT * FROM users WHERE dni = ?", [dni]);
	done(null, rows[0][0]);
});

export default passport;