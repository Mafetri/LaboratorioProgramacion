import express from "express";
import flash from "connect-flash";
import passport from "./lib/passport.js";
import session from "express-session";
//import validator from "express-validator";

// Routes
import newsRoutes from "./components/news/news.routes.js";
import fleetRoutes from "./components/fleet/fleet.routes.js";
import weatherRoutes from "./components/weather/weather.routes.js";
import coursesRoutes from "./components/courses/courses.routes.js";
import trajectoryRoutes from "./components/trajectory/trajectory.routes.js";
import submitForm from "./components/form/form.routes.js";
import auth from "./components/auth/auth.routes.js";
import users from "./components/users/user.routes.js";
import auditlog from "./components/auditlog/auditlog.routes.js";
import turnsRoutes from "./components/turns/turns.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(session({
    secret: 'tokinhoteamo',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(validator());

// APIs
app.use(auth);
app.use("/api", newsRoutes);
app.use("/api", fleetRoutes);
app.use("/api", weatherRoutes);
app.use("/api", coursesRoutes);
app.use("/api", trajectoryRoutes);
app.use("/api", submitForm);
app.use("/api", users);
app.use("/api", auditlog);
app.use("/api", turnsRoutes);

// Static webpage
app.use(express.static('src/static'));

export default app;
