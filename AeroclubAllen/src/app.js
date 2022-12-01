import express from "express";
import newsRoutes from "./routes/news.routes.js";
import fleetRoutes from "./routes/fleet.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import trajectoryRoutes from "./routes/trajectory.routes.js";
import submitForm from "./routes/form.routes.js";
import users from "./routes/users.routes.js";
import flash from "connect-flash";
import passport from "./lib/passport.js";
import session from "express-session";
//import validator from "express-validator";

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
app.use("/api", newsRoutes);
app.use("/api", fleetRoutes);
app.use("/api", weatherRoutes);
app.use("/api", coursesRoutes);
app.use("/api", trajectoryRoutes);
app.use("/api", submitForm);
app.use(users);

// Static webpage
app.use(express.static('src/static'));

export default app;
