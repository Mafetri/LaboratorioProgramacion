import { Router } from "express";
import passport from "../lib/passport.js";

const router = Router();

// Sign Up
router.post(
	"/signup",
	passport.authenticate("local.signup", {
		successRedirect: "../pages/dashboard/sign-in.html",
		failureRedirect: "../pages/dashboard/register.html",
		failureFlash: true,
	}),
);

// Sing In
router.post("/signin", (req, res, next) => {
	passport.authenticate("local.signin", {
		successRedirect: "../pages/dashboard/dashboard.html",
		failureRedirect: "../pages/dashboard/sign-in.html",
		failureFlash: true,
	})(req, res, next);
});

// Log out
router.get('/logout', (req, res) => {
    req.logout((e) => {
        if (e) { 
            return next(e); 
        }
        res.redirect('/index.html');
    });
});

export default router;
