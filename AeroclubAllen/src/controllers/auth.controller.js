// Data Base
import { pool } from "../db.js";

// Passport
import passport from "../lib/passport.js";
import path from "path";

// Absolute path
import { fileURLToPath } from "url";

import { somethingWentWrong500 } from "../error/error.handler.js";

// Sign Page
export const sendSing = (req, res) => {
	res.sendFile(
		path.join(
			fileURLToPath(import.meta.url),
			"../../views/sign.html",
		),
	);
}

// SignUp
export const passportSignup = (req, res, next) => {
    passport.authenticate("local.signup", {
		successRedirect: "/dashboard",
		failureRedirect: "/sign",
		failureFlash: true,
	})(req, res, next)
}

// SignIn
export const passportSignin = (req, res, next) => {
	passport.authenticate("local.signin", {
		successRedirect: "/dashboard",
		failureRedirect: "/sign",
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
			"../../views/dashboard.html",
		),
	);
}