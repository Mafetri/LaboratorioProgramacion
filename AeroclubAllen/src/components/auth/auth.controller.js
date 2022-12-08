// Passport
import passport from "../../lib/passport.js";
import path from "path";

// Absolute path
import { fileURLToPath } from "url";

// Sign Page
export const sendSing = (req, res) => {
	res.sendFile(path.join(fileURLToPath(import.meta.url), "../../../views/sign.html"));
};

// SignUp
export const passportSignup = (req, res, next) => {
	passport.authenticate("local.signup", {
		successRedirect: "/userPage",
		failureRedirect: "/sign",
		failureFlash: true,
	})(req, res, next);
};

// SignIn
export const passportSignin = (req, res, next) => {
	passport.authenticate("local.signin", {
		successRedirect: "/userPage",
		failureRedirect: "/sign",
		failureFlash: true,
	})(req, res, next);
};

// Logout
export const logout = (req, res) => {
	req.logout((e) => {
		if (e) {
			return next(e);
		}
		res.redirect("/index.html");
	});
};

// Dashboard
export const sendDashboard = (req, res) => {
	res.sendFile(path.join(fileURLToPath(import.meta.url), "../../../views/dashboard.html"));
};

// User Page
export const sendUserPage = async (req, res) => {
	try {
		res.sendFile(path.join(fileURLToPath(import.meta.url), "../../../views/user.html"));
	} catch (e) {
		somethingWentWrong500(e, res);
	}
}

// User Role
export const getUserRole = (req, res) => {
	res.json({ role: req.user.role });
};
