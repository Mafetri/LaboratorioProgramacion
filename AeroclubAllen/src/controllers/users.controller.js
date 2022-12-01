// Data Base
import { pool } from "../db.js";

// Passport
import passport from "../lib/passport.js";
import path from "path";

// Absolute path
import { fileURLToPath } from "url";

// SignUp
export const sendSignup = (req, res) => {
    res.sendFile(path.join(fileURLToPath(import.meta.url),'../../views/dashboard/sign-up.html'));
}
export const passportSignup = (req, res, next) => {
    passport.authenticate("local.signup", {
		successRedirect: "/signin",
		failureRedirect: "/signup",
		failureFlash: true,
	})(req, res, next)
}

// SignIn
export const sendSingin = (req, res) => {
	res.sendFile(
		path.join(
			fileURLToPath(import.meta.url),
			"../../views/dashboard/sign-in.html",
		),
	);
}
export const passportSignin = (req, res, next) => {
	passport.authenticate("local.signin", {
		successRedirect: "/dashboard",
		failureRedirect: "/signin",
		failureFlash: true,
	})(req, res, next);
}

// Logout
export const logout = (req, res) => {
	req.logout((e) => {
		if (e) {
			return next(e);
		}
		res.redirect("/index.html");
	});
}

// Dashboard
export const sendDashboard = (req, res) => {
	res.sendFile(
		path.join(
			fileURLToPath(import.meta.url),
			"../../views/dashboard/dashboard.html",
		),
	);
}

// Get Users
export const getUsers = async (req, res) => {
    try {
		const [ rows ] = await pool.query(
			"SELECT dni, name, surname, role FROM users"
		);
		res.json(rows);
	} catch (e) {
		return res.status(500).json({
			message: "Something went wrong",
			error: e,
		});
	}
}