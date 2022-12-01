import { Router } from "express";
import passport from "../lib/passport.js";
import path from "path";
import {fileURLToPath} from "url"
import { isLoggedIn } from "../lib/auth.js";
const router = Router();

// Sign Up
router.post(
	"/signup",
	passport.authenticate("local.signup", {
		successRedirect: "/signin",
		failureRedirect: "/signup",
		failureFlash: true,
	}),
);

// Sing In
router.post("/signin", (req, res, next) => {
	passport.authenticate("local.signin", {
		successRedirect: "/dashboard",
		failureRedirect: "/signin",
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

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.sendFile(path.join(fileURLToPath(import.meta.url),'../../views/dashboard/dashboard.html'))
}); 

router.get('/signin', (req, res) => {
    res.sendFile(path.join(fileURLToPath(import.meta.url),'../../views/dashboard/sign-in.html'));
}); 

router.get('/signup', (req, res) => {
    res.sendFile(path.join(fileURLToPath(import.meta.url),'../../views/dashboard/sign-up.html'));
}); 

export default router;
